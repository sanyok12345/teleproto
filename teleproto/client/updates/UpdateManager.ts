import { Api } from "../../tl";
import * as utils from "../../Utils";
import type { TelegramClient } from "../TelegramClient";
import type { StoredUpdateState } from "../../sessions/Abstract";
import { UpdateConnectionState } from "../../network";
import { ChannelUpdates, type ChannelPollingState, type ChannelUpdatesHost } from "./ChannelUpdates";
import { PtsWaiter, SINGLE_GAP_REPAIR_MS, WAIT_FOR_SKIPPED_TIMEOUT_MS } from "./PtsWaiter";
import {
    collectEntities,
    hasQts,
    isChannelPtsUpdate,
    isCommonPtsUpdate,
    isMessage,
    nextRetryDelaySeconds,
    requestChannelId,
    type DispatchPayload,
    type PtsUpdate,
} from "./updateKinds";

export type { ChannelPollingState } from "./ChannelUpdates";

const STATE_CHECK_AFTER_MS = 300_000;
const STATE_CHECK_JITTER_MS = 60_000;
const RECENT_MESSAGE_BUFFER_SIZE = 1000;
const MAX_PENDING_SEQ = 1000;
const GAP_TIMEOUT_UPDATE_COUNT = 20;
const DIFFERENCE_DEADLINE_MS = 120_000;
const STATE_SAVE_DELAY_MS = 50;
const MAX_DATE = 2147483647;

export interface UpdateState {
    pts: number;
    qts: number;
    date: number;
    seq: number;
}

interface PendingSeqUpdate {
    update: Api.Updates | Api.UpdatesCombined;
    seqStart: number;
    seq: number;
    receivedAt: number;
    payload: DispatchPayload;
    updates: Api.TypeUpdate[];
}

type BeforeState = [update: Api.TypeUpdate | Api.TypeUpdates, noDispatch: boolean, request: unknown];

export class UpdateManager implements ChannelUpdatesHost {
    state?: UpdateState;
    lastUpdateTime = 0;
    generation = 0;
    readonly client: TelegramClient;

    private readonly channels: ChannelUpdates;
    private readonly globalPts: PtsWaiter;
    private readonly qts: PtsWaiter;
    private readonly gapTimers: { pts?: NodeJS.Timeout; qts?: NodeJS.Timeout } = {};
    private readonly beforeState: BeforeState[] = [];
    private readonly pendingSeq: PendingSeqUpdate[] = [];
    private readonly recentMessageKeys = new Set<string>();
    private readonly recentMessageQueue: string[] = [];
    private initializing?: Promise<void>;
    private repairTimer?: NodeJS.Timeout;
    private seqGapTimer?: NodeJS.Timeout;
    private retryTimer?: NodeJS.Timeout;
    private saveTimer?: NodeJS.Timeout;
    private fetchingDifference = false;
    private retryDelayS = 0;
    private stateCheckAfterMs = 0;
    private running = false;

    constructor(client: TelegramClient) {
        this.client = client;
        this.channels = new ChannelUpdates(this);
        this.globalPts = this.makeWaiter("pts");
        this.qts = this.makeWaiter("qts");
    }

    get isRunning(): boolean {
        return this.running;
    }

    get polling(): ChannelPollingState {
        return this.channels.polling;
    }

    start(): void {
        if (this.running) return;
        this.running = true;
        this.channels.start();
        this.client.updates._resume();
    }

    stop(): void {
        this.flushState();
        this.running = false;
        this.generation++;
        this.channels.stop();
        this.client.updates._pause();
        this.initializing = undefined;
        this.beforeState.length = 0;
        for (const waiter of [this.globalPts, this.qts]) {
            waiter.clearSkippedUpdates();
            waiter.setRequesting(false);
        }
        for (const timer of [this.gapTimers.pts, this.gapTimers.qts, this.repairTimer, this.retryTimer, this.seqGapTimer]) {
            clearTimeout(timer);
        }
        this.gapTimers.pts = this.gapTimers.qts = this.repairTimer = this.retryTimer = this.seqGapTimer = undefined;
        this.pendingSeq.length = 0;
        this.fetchingDifference = false;
        this.retryDelayS = 0;
    }

    reset(): void {
        this.state = undefined;
        this.lastUpdateTime = 0;
        this.channels.reset();
        this.recentMessageKeys.clear();
        this.recentMessageQueue.length = 0;
        this.globalPts.init(0);
        this.qts.init(0);
        this.client.session.setUpdateState(undefined);
    }

    isCurrent(generation: number): boolean {
        return this.running && this.generation === generation;
    }

    receive(update: Api.TypeUpdate | Api.TypeUpdates | UpdateConnectionState | number): void {
        try {
            if (typeof update === "number" || update instanceof UpdateConnectionState) {
                const state = typeof update === "number" ? ([-1, 0, 1].includes(update) ? new UpdateConnectionState(update) : undefined) : update;
                if (state) {
                    this.client._updateDispatcher
                        .dispatch(state)
                        .catch((e) => this.client._log.error(`Error dispatching connection state: ${e}`));
                }
                return;
            }
            const inner = (update as { updates?: unknown[] }).updates ?? [update];
            if (inner.some((item) => item instanceof Api.UpdateConfig)) void this.client._reloadConfig();
            this.onUpdates(update);
        } catch (e) {
            this.client._log.error(`Error handling update: ${e}`);
        }
    }

    onUpdates(update: Api.TypeUpdate | Api.TypeUpdates, noDispatch = false, request?: unknown): void {
        if (!this.running) return;
        try {
            this.lastUpdateTime = Date.now();
            this.client._entityCache.add(update as never);
            void this.saveEntities(update);
            if (noDispatch) markNoDispatch(update);
            if (!this.state && update instanceof Api.UpdatesTooLong) return;
            if (!this.state && isStateful(update)) {
                this.beforeState.push([update, noDispatch, request]);
                void this.ensureState();
                return;
            }
            if (update instanceof Api.Updates || update instanceof Api.UpdatesCombined) {
                this.handleContainer(update);
            } else if (update instanceof Api.UpdateShort) {
                this.feed(update.update, { others: null });
            } else if (update instanceof Api.UpdateShortMessage || update instanceof Api.UpdateShortChatMessage) {
                this.handleShortMessage(update);
            } else if (update instanceof Api.UpdateShortSentMessage) {
                this.handleShortSentMessage(update, noDispatch ? request : undefined);
            } else if (update instanceof Api.UpdatesTooLong) {
                this.client._log.info("Received updatesTooLong, fetching difference");
                this.requestDifference();
            } else {
                this.feed(update as Api.TypeUpdate, { others: null });
            }
        } catch (e) {
            this.client._log.error(`Error in onUpdates: ${e}`);
        }
    }

    applyAffected(pts: number, ptsCount: number, channelId?: string): void {
        if (!this.running || !this.state) return;
        if (channelId) this.channels.applyAffected(channelId, pts, ptsCount);
        else this.globalPts.updateAndApply(pts, ptsCount, { tag: "update" }, () => {}, () => {});
    }

    async catchUp(): Promise<void> {
        const generation = this.generation;
        if (!this.isCurrent(generation) || this.client.updates.authorizationError) return;
        try {
            if (!this.state) await this.ensureState();
            else await this.fetchDifference();
        } catch (e) {
            if (!this.isCurrent(generation) || this.client.updates._suspendAuthorization(e)) return;
            this.client._log.error(`Error during catch up: ${e}`);
        }
    }

    watchChannel(channelId: string, inputChannel: Api.TypeInputChannel, signal?: AbortSignal): Promise<void> {
        return this.channels.watch(channelId, inputChannel, signal);
    }

    releaseChannel(channelId: string): void {
        this.channels.release(channelId);
    }

    watchedChannelIds(): string[] {
        return this.channels.watchedIds();
    }

    handleChannelFloodWait(request: object, seconds: number): boolean {
        return this.channels.handleFloodWait(request, seconds);
    }

    async ensureState(): Promise<void> {
        if (this.initializing) return this.initializing;
        const generation = this.generation;
        if (this.state || !this.isCurrent(generation) || this.client.updates.authorizationError) return;
        const task = this.initState(generation);
        this.initializing = task;
        try {
            await task;
        } finally {
            if (this.initializing === task) this.initializing = undefined;
        }
    }

    private async initState(generation: number) {
        try {
            const stored = this.client.session.getUpdateState();
            const resume = !!stored && stored.pts > 0;
            if (resume) {
                this.client._log.info(`Resuming updates from saved state pts=${stored.pts} qts=${stored.qts} date=${stored.date}`);
                this.refreshFromState(stored);
                this.channels.restore(stored.channels);
            } else {
                this.refreshFromState(await this.client.api.updates.getState());
            }
            if (!this.isCurrent(generation)) return;
            this.lastUpdateTime = Date.now();
            for (const [update, noDispatch, request] of this.beforeState.splice(0)) this.onUpdates(update, noDispatch, request);
            if (resume) await this.fetchDifference();
        } catch (error) {
            if (this.isCurrent(generation)) this.client.updates._suspendAuthorization(error);
        }
    }

    refreshFromState(state: UpdateState): void {
        this.state = { pts: state.pts, qts: state.qts, date: state.date, seq: state.seq };
        this.globalPts.init(state.pts);
        this.qts.init(state.qts);
        this.saveState();
    }

    isStale(): boolean {
        if (!this.state) return false;
        this.stateCheckAfterMs ||= STATE_CHECK_AFTER_MS + Math.random() * STATE_CHECK_JITTER_MS;
        return Date.now() - this.lastUpdateTime > this.stateCheckAfterMs;
    }

    async recoverIfStale(): Promise<void> {
        if (!this.isStale() || this.fetchingDifference) return;
        this.stateCheckAfterMs = 0;
        this.lastUpdateTime = Date.now();
        try {
            const server = await this.client.api.updates.getState();
            const local = this.state;
            if (!local || server.pts > local.pts || server.qts > local.qts || server.seq > local.seq) {
                this.client._log.debug("Server state moved during a quiet period, fetching difference");
                await this.fetchDifference();
            }
        } catch (error) {
            if (this.client.updates._suspendAuthorization(error)) return;
            await this.fetchDifference();
        }
    }

    requestDifference(): void {
        if (!this.state) {
            void this.ensureState();
            return;
        }
        if (!this.fetchingDifference) void this.fetchDifference();
    }

    dispatch(update: Api.TypeUpdate, payload: DispatchPayload): void {
        if (!this.running || this.isDuplicateMessage(update)) return;
        if ((update as { _noDispatch?: boolean })._noDispatch) return;
        (update as unknown as { _entities: Map<string, unknown> })._entities = payload.entities ?? new Map();
        this.client._updateDispatcher.dispatch(update).catch((e) => this.client._log.error(`Error dispatching update: ${e}`));
    }

    async saveEntities(tlo: unknown): Promise<void> {
        try {
            await this.client.session.processEntities(tlo);
        } catch (e) {
            this.client._log.warn(`session.processEntities failed: ${e}`);
        }
    }

    saveState() {
        if (this.saveTimer) return;
        this.saveTimer = setTimeout(() => this.flushState(), STATE_SAVE_DELAY_MS);
        this.saveTimer.unref?.();
    }

    private flushState() {
        clearTimeout(this.saveTimer);
        this.saveTimer = undefined;
        if (!this.state) return;
        const snapshot: StoredUpdateState = { ...this.state, channels: this.channels.snapshot() };
        try {
            this.client.session.setUpdateState(snapshot);
        } catch (error) {
            this.client._log.warn(`Failed to save update state: ${error}`);
        }
    }

    private feed(update: Api.TypeUpdate, payload: DispatchPayload): void {
        if (!this.state) {
            this.dispatch(update, payload);
            return;
        }
        if (update instanceof Api.UpdateChannelTooLong) {
            this.channels.tooLong(update, false);
        } else if (update instanceof Api.UpdatePtsChanged) {
            this.client._log.info("Received updatePtsChanged, fetching difference");
            this.requestDifference();
        } else if (isCommonPtsUpdate(update)) {
            this.globalPts.updateAndApply(update.pts, update.ptsCount, { tag: "update", update }, (applied) => this.dispatch(applied, payload), () => {});
        } else if (isChannelPtsUpdate(update)) {
            this.channels.feed(update, payload);
        } else if (hasQts(update)) {
            this.qts.updateAndApply(update.qts, 1, { tag: "update", update }, (applied) => this.dispatch(applied, payload), () => {});
        } else {
            this.dispatch(update, payload);
        }
    }

    private handleContainer(update: Api.Updates | Api.UpdatesCombined): void {
        const seqStart = update instanceof Api.UpdatesCombined ? update.seqStart : update.seq;
        if (seqStart < 0 || update.seq < 0 || (update.seq !== 0 && update.seq < seqStart)) {
            this.client._log.warn(`Invalid seq ${seqStart}..${update.seq}, fetching difference`);
            this.requestDifference();
            return;
        }
        const payload: DispatchPayload = { others: update.updates, entities: collectEntities(update.users, update.chats) };
        const ordered: Api.TypeUpdate[] = [];
        for (const item of update.updates) {
            if (isCommonPtsUpdate(item) || isChannelPtsUpdate(item) || hasQts(item) || item instanceof Api.UpdateChannelTooLong) {
                this.feed(item, payload);
            } else {
                ordered.push(item);
            }
        }
        this.applySeq({ update, updates: ordered, payload, seqStart, seq: update.seq, receivedAt: Date.now() });
        this.drainPendingSeq();
    }

    private applySeq(entry: PendingSeqUpdate): void {
        if (!this.state) return;
        const { seqStart, seq, update } = entry;
        if (seqStart !== 0 && seqStart <= this.state.seq) return;
        if (this.fetchingDifference || (seqStart !== 0 && seqStart > this.state.seq + 1)) {
            if (seqStart === 0 || !this.pendingSeq.some((pending) => pending.seqStart === seqStart && pending.seq === seq)) {
                if (this.pendingSeq.length >= MAX_PENDING_SEQ) this.pendingSeq.shift();
                this.pendingSeq.push(entry);
            }
            if (!this.fetchingDifference) this.armSeqGapTimer();
            return;
        }
        for (const item of entry.updates) this.feed(item, entry.payload);
        if (seq === 0) return;
        this.state.seq = seq;
        if (update.date && update.date <= Date.now() / 1000 + 1 && update.date > this.state.date) this.state.date = update.date;
        this.saveState();
    }

    private armSeqGapTimer(): void {
        clearTimeout(this.seqGapTimer);
        const firstReceivedAt = Math.min(...this.pendingSeq.slice(0, GAP_TIMEOUT_UPDATE_COUNT).map((entry) => entry.receivedAt));
        this.seqGapTimer = setTimeout(() => {
            this.seqGapTimer = undefined;
            this.client._log.debug("Seq gap was not filled in time, fetching difference");
            this.requestDifference();
        }, Math.max(0, firstReceivedAt + WAIT_FOR_SKIPPED_TIMEOUT_MS - Date.now()));
    }

    private drainPendingSeq(): void {
        if (!this.state || this.fetchingDifference) return;
        this.pendingSeq.sort((a, b) => a.seqStart - b.seqStart);
        while (this.pendingSeq.length) {
            const entry = this.pendingSeq[0];
            if (entry.seqStart !== 0 && entry.seqStart > this.state.seq + 1) break;
            this.pendingSeq.shift();
            this.applySeq(entry);
        }
        if (this.pendingSeq.length) {
            this.armSeqGapTimer();
        } else {
            clearTimeout(this.seqGapTimer);
            this.seqGapTimer = undefined;
        }
    }

    private dropUnfillablePendingSeq() {
        if (!this.state) return;
        const seq = this.state.seq;
        for (let i = this.pendingSeq.length - 1; i >= 0; i--) {
            const entry = this.pendingSeq[i];
            if (entry.seqStart !== 0 && entry.seqStart > seq + 1) this.pendingSeq.splice(i, 1);
        }
    }

    private handleShortMessage(update: Api.UpdateShortMessage | Api.UpdateShortChatMessage): void {
        const asUpdate = update as unknown as Api.TypeUpdate;
        if (!this.state) {
            this.dispatch(asUpdate, { others: null });
            return;
        }
        this.globalPts.updateAndApply(update.pts, update.ptsCount, { tag: "update", update: asUpdate }, (applied) => this.dispatch(applied, { others: null }), () => {});
    }

    private handleShortSentMessage(update: Api.UpdateShortSentMessage, request: unknown): void {
        if (!this.state) return;
        if (request === undefined) {
            this.client._log.warn("updateShortSentMessage arrived outside of a request result, fetching difference");
            this.requestDifference();
            return;
        }
        this.applyAffected(update.pts, update.ptsCount, requestChannelId(request));
    }

    private isDuplicateMessage(update: Api.TypeUpdate): boolean {
        if (!(update instanceof Api.UpdateNewMessage) && !(update instanceof Api.UpdateNewChannelMessage)) return false;
        const message = update.message as { id?: number; peerId?: Api.TypePeer };
        if (message?.id == undefined || message.peerId == undefined) return false;
        let peerId: string;
        try {
            peerId = utils.getPeerId(message.peerId);
        } catch {
            return false;
        }
        const key = `${peerId}:${message.id}`;
        if (this.recentMessageKeys.has(key)) return true;
        this.recentMessageKeys.add(key);
        this.recentMessageQueue.push(key);
        if (this.recentMessageQueue.length > RECENT_MESSAGE_BUFFER_SIZE) this.recentMessageKeys.delete(this.recentMessageQueue.shift()!);
        return false;
    }

    private makeWaiter(kind: "pts" | "qts"): PtsWaiter {
        return new PtsWaiter({
            onApplied: (value) => {
                if (!this.state) return;
                this.state[kind] = value;
                this.saveState();
            },
            onWaitForSkipped: (ms) => {
                clearTimeout(this.gapTimers[kind]);
                this.gapTimers[kind] = undefined;
                if (ms < 0) {
                    if (kind === "pts") {
                        clearTimeout(this.repairTimer);
                        this.repairTimer = undefined;
                    }
                    return;
                }
                this.gapTimers[kind] = setTimeout(() => {
                    this.gapTimers[kind] = undefined;
                    this.client._log.debug(`${kind} gap was not filled in time, fetching difference`);
                    this.requestDifference();
                }, ms);
            },
            onSingleGap:
                kind === "pts"
                    ? () => {
                          if (this.repairTimer) return;
                          this.repairTimer = setTimeout(() => {
                              this.repairTimer = undefined;
                              void this.repairSingleGap();
                          }, SINGLE_GAP_REPAIR_MS);
                      }
                    : undefined,
        });
    }

    private async repairSingleGap(): Promise<void> {
        const generation = this.generation;
        if (!this.state || this.fetchingDifference || !this.globalPts.pendingCount) return;
        const pts = this.globalPts.current();
        let diff: Api.updates.TypeDifference;
        try {
            diff = await this.client.invoke(
                new Api.updates.GetDifference({ pts, ptsLimit: 1, ptsTotalLimit: 0, date: MAX_DATE, qts: 0, qtsLimit: 0 })
            );
        } catch {
            return;
        }
        if (!this.isCurrent(generation) || this.globalPts.current() !== pts) return;
        if (!(diff instanceof Api.updates.Difference || diff instanceof Api.updates.DifferenceSlice)) return;
        const updates: PtsUpdate[] = [
            ...diff.newMessages.filter(isMessage).map((message) => new Api.UpdateNewMessage({ message, pts: pts + 1, ptsCount: 1 })),
            ...diff.otherUpdates.filter(isCommonPtsUpdate),
        ];
        if (updates.length !== 1) return;
        this.client._entityCache.add(diff);
        await this.saveEntities(diff);
        const entities = collectEntities(diff.users, diff.chats);
        this.client._log.debug(`Repaired a single pts gap at ${pts + 1}`);
        this.globalPts.updateAndApply(pts + 1, 1, { tag: "update", update: updates[0] }, (applied) => this.dispatch(applied, { others: null, entities }), () => {});
    }

    private async fetchDifference(): Promise<void> {
        const generation = this.generation;
        if (!this.isCurrent(generation) || this.client.updates.authorizationError || this.fetchingDifference || !this.state) return;
        clearTimeout(this.retryTimer);
        this.retryTimer = undefined;
        this.fetchingDifference = true;
        this.globalPts.setRequesting(true);
        this.qts.setRequesting(true);
        let failed = false;
        try {
            await this.differenceLoop(generation);
            if (this.isCurrent(generation)) this.retryDelayS = 0;
        } catch (e) {
            if (!this.isCurrent(generation) || this.client.updates._suspendAuthorization(e)) return;
            if ((e as { errorMessage?: string })?.errorMessage === "PERSISTENT_TIMESTAMP_INVALID") {
                this.client._log.warn("Saved update state is invalid, reinitializing it");
                this.state = undefined;
                this.client.session.setUpdateState(undefined);
                void this.ensureState();
            } else {
                failed = true;
                this.client._log.warn(`updates.getDifference failed: ${e}`);
            }
        } finally {
            if (this.isCurrent(generation)) {
                if (this.state) {
                    this.globalPts.init(this.state.pts, true);
                    this.qts.init(this.state.qts, true);
                }
                this.fetchingDifference = false;
                this.globalPts.setRequesting(false);
                this.qts.setRequesting(false);
                this.saveState();
            }
        }
        if (failed && this.running) {
            this.retryDelayS = nextRetryDelaySeconds(this.retryDelayS);
            this.client._log.debug(`Retrying updates.getDifference in ${Math.round(this.retryDelayS)}s`);
            this.retryTimer = setTimeout(() => {
                this.retryTimer = undefined;
                void this.fetchDifference();
            }, this.retryDelayS * 1000);
        }
        this.drainPendingSeq();
    }

    private async differenceLoop(generation: number): Promise<void> {
        while (this.state && this.isCurrent(generation)) {
            const diff: Api.updates.TypeDifference = await withDeadline(
                this.client.invoke(new Api.updates.GetDifference({ pts: this.state.pts, date: this.state.date, qts: this.state.qts })),
                DIFFERENCE_DEADLINE_MS,
                "updates.getDifference"
            );
            if (!this.isCurrent(generation)) return;
            if (diff instanceof Api.updates.DifferenceEmpty) {
                this.state.date = diff.date;
                this.state.seq = diff.seq;
                this.dropUnfillablePendingSeq();
                return;
            }
            if (diff instanceof Api.updates.DifferenceTooLong) {
                this.client._log.warn("updates.getDifference returned differenceTooLong, some updates are skipped");
                this.state.pts = diff.pts;
                continue;
            }
            await this.applyDifference(diff, generation);
            if (!this.isCurrent(generation)) return;
            const next = diff instanceof Api.updates.Difference ? diff.state : diff.intermediateState;
            this.state = { pts: next.pts, qts: next.qts, date: next.date, seq: next.seq };
            if (diff instanceof Api.updates.Difference) return;
        }
    }

    private async applyDifference(diff: Api.updates.Difference | Api.updates.DifferenceSlice, generation: number): Promise<void> {
        const entities = collectEntities(diff.users, diff.chats);
        this.client._entityCache.add(diff);
        await this.saveEntities(diff);
        if (!this.isCurrent(generation)) return;
        const others = diff.otherUpdates;
        const first = new Set<Api.TypeUpdate>(
            others.filter(
                (update) =>
                    update instanceof Api.UpdateMessageID || update instanceof Api.UpdateEncryption || update instanceof Api.UpdateFolderPeers
            )
        );
        for (const update of first) this.dispatch(update, { others, entities });
        for (const message of diff.newMessages.filter(isMessage)) {
            this.dispatch(new Api.UpdateNewMessage({ message, pts: 0, ptsCount: 0 }), { others: null, entities });
        }
        for (const message of diff.newEncryptedMessages) {
            this.dispatch(new Api.UpdateNewEncryptedMessage({ message, qts: 0 }), { others: null, entities });
        }
        for (const update of others) {
            if (first.has(update)) continue;
            if (update instanceof Api.UpdateChannelTooLong) this.channels.tooLong(update, true);
            else if (isChannelPtsUpdate(update)) this.channels.feed(update, { others, entities });
            else this.dispatch(update, { others, entities });
        }
    }
}

function isStateful(update: Api.TypeUpdate | Api.TypeUpdates): boolean {
    const raw = (update instanceof Api.UpdateShort ? update.update : update) as Api.TypeUpdate;
    return (
        update instanceof Api.Updates ||
        update instanceof Api.UpdatesCombined ||
        update instanceof Api.UpdateShortMessage ||
        update instanceof Api.UpdateShortChatMessage ||
        update instanceof Api.UpdateShortSentMessage ||
        update instanceof Api.UpdatesTooLong ||
        isCommonPtsUpdate(raw) ||
        isChannelPtsUpdate(raw) ||
        hasQts(raw)
    );
}

function markNoDispatch(update: Api.TypeUpdate | Api.TypeUpdates): void {
    const mark = (obj: object) => Object.defineProperty(obj, "_noDispatch", { value: true, configurable: true });
    mark(update);
    if (update instanceof Api.Updates || update instanceof Api.UpdatesCombined) for (const u of update.updates) mark(u);
    else if (update instanceof Api.UpdateShort) mark(update.update);
}

function withDeadline<T>(promise: Promise<T>, ms: number, what: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const timer = setTimeout(() => {
            promise.catch(() => {});
            reject(new Error(`${what} timed out after ${ms}ms`));
        }, ms);
        promise.then(
            (value) => {
                clearTimeout(timer);
                resolve(value);
            },
            (error) => {
                clearTimeout(timer);
                reject(error);
            }
        );
    });
}
