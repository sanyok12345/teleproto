import bigInt from "big-integer";
import { Api } from "../tl";
import * as utils from "../Utils";
import { returnBigInt } from "../Helpers";
import type { TelegramClient } from "./TelegramClient";
import { _dispatchUpdate } from "./updates";
import { PtsWaiter, type PtsWaiterHost } from "./PtsWaiter";

const NO_UPDATES_TIMEOUT_MS = 15 * 60 * 1000;
const FAIL_DIFFERENCE_INITIAL_S = 1;
const FAIL_DIFFERENCE_CAP_S = 64;
const CHANNEL_DIFFERENCE_LIMIT = 100;
const RECENT_MESSAGE_BUFFER_SIZE = 1000;

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
}

interface ChannelTracker {
    pts: PtsWaiter;
    timer?: NodeJS.Timeout;
    inputChannel?: Api.TypeInputChannel;
}

type DispatchPayload = {
    others: Api.TypeUpdate[] | null;
    entities?: Map<string, Api.TypeUser | Api.TypeChat>;
};

function isCommonPtsUpdate(update: Api.TypeUpdate): boolean {
    return (
        update instanceof Api.UpdateNewMessage ||
        update instanceof Api.UpdateDeleteMessages ||
        update instanceof Api.UpdateReadHistoryInbox ||
        update instanceof Api.UpdateReadHistoryOutbox ||
        update instanceof Api.UpdateWebPage ||
        update instanceof Api.UpdateReadMessagesContents ||
        update instanceof Api.UpdateEditMessage ||
        update instanceof Api.UpdateFolderPeers ||
        update instanceof Api.UpdatePinnedMessages
    );
}

function isChannelPtsUpdate(update: Api.TypeUpdate): boolean {
    return (
        update instanceof Api.UpdateNewChannelMessage ||
        update instanceof Api.UpdateEditChannelMessage ||
        update instanceof Api.UpdateDeleteChannelMessages ||
        update instanceof Api.UpdateChannelWebPage ||
        update instanceof Api.UpdatePinnedChannelMessages
    );
}

function getChannelId(update: Api.TypeUpdate): string | undefined {
    const u = update as { channelId?: bigInt.BigInteger; message?: { peerId?: unknown } };
    if (u.channelId) return u.channelId.toString();
    const peer = u.message?.peerId;
    if (peer instanceof Api.PeerChannel) return peer.channelId.toString();
    return undefined;
}

function hasQts(update: Api.TypeUpdate): update is Api.TypeUpdate & { qts: number } {
    return typeof (update as { qts?: unknown }).qts === "number";
}

export class UpdateManager {
    state?: UpdateState;
    lastUpdateTime = 0;

    private readonly client: TelegramClient;
    private readonly globalPts: PtsWaiter;
    private globalPtsTimer?: NodeJS.Timeout;
    private readonly channels = new Map<string, ChannelTracker>();
    private readonly pendingSeq: PendingSeqUpdate[] = [];
    private readonly recentMessageKeys = new Set<string>();
    private readonly recentMessageQueue: string[] = [];

    private fetchingDifference = false;
    private failTimeoutS = FAIL_DIFFERENCE_INITIAL_S;
    private failRetryTimer?: NodeJS.Timeout;
    private readonly channelFailTimeoutS = new Map<string, number>();
    private readonly channelFailRetryTimers = new Map<string, NodeJS.Timeout>();

    private running = false;

    constructor(client: TelegramClient) {
        this.client = client;
        this.globalPts = this.makeGlobalWaiter();
    }

    start(): void {
        this.running = true;
    }

    stop(): void {
        this.running = false;
        this.globalPts.clearSkippedUpdates();
        this.globalPts.setRequesting(false);
        if (this.globalPtsTimer) {
            clearTimeout(this.globalPtsTimer);
            this.globalPtsTimer = undefined;
        }
        if (this.failRetryTimer) {
            clearTimeout(this.failRetryTimer);
            this.failRetryTimer = undefined;
        }
        for (const t of this.channelFailRetryTimers.values()) clearTimeout(t);
        this.channelFailRetryTimers.clear();
        for (const tracker of this.channels.values()) {
            if (tracker.timer) clearTimeout(tracker.timer);
            tracker.pts.clearSkippedUpdates();
            tracker.pts.setRequesting(false);
        }
        this.channels.clear();
        this.pendingSeq.length = 0;
        this.fetchingDifference = false;
        this.failTimeoutS = FAIL_DIFFERENCE_INITIAL_S;
        this.channelFailTimeoutS.clear();
    }

    onUpdates(update: Api.TypeUpdate | Api.TypeUpdates): void {
        if (!this.running) return;
        try {
            this.lastUpdateTime = Date.now();
            this.client._entityCache.add(update as never);
            void this.saveEntities(update);

            if (update instanceof Api.Updates || update instanceof Api.UpdatesCombined) {
                this.handleContainer(update);
            } else if (update instanceof Api.UpdateShort) {
                if (this.state) this.state.date = update.date;
                this.feedUpdate(update.update, { others: null });
            } else if (update instanceof Api.UpdateShortMessage || update instanceof Api.UpdateShortChatMessage) {
                this.handleShortMessage(update);
            } else if ((update as { className?: string }).className === "UpdatesTooLong") {
                this.client._log.warn("Received UpdatesTooLong, requesting common difference");
                this.scheduleCommonDifference();
            } else {
                this.feedUpdate(update as Api.TypeUpdate, { others: null });
            }
        } catch (e) {
            this.client._log.error(`Error in onUpdates: ${e}`);
        }
    }

    async catchUp(): Promise<void> {
        try {
            if (!this.state) {
                const s = await this.client.api.updates.getState();
                this.state = { pts: s.pts, qts: s.qts, date: s.date, seq: s.seq };
                this.globalPts.init(s.pts);
                this.client._log.debug("Initialized update state");
                return;
            }
            this.client._log.debug("Catching up on missed updates...");
            await this.fetchDifferenceLoop();
            this.client._log.debug("Catch up complete");
        } catch (e) {
            this.client._log.error(`Error during catch up: ${e}`);
        }
    }

    async ensureState(): Promise<void> {
        if (this.state) return;
        try {
            const s = await this.client.api.updates.getState();
            this.state = { pts: s.pts, qts: s.qts, date: s.date, seq: s.seq };
            this.globalPts.init(s.pts);
            this.lastUpdateTime = Date.now();
        } catch {
            // ignore — user may not be authorized yet
        }
    }

    refreshFromState(state: { pts: number; qts: number; date: number; seq: number }): void {
        if (this.state) {
            this.state.pts = state.pts;
            this.state.qts = state.qts;
            this.state.date = state.date;
            this.state.seq = state.seq;
        } else {
            this.state = { ...state };
        }
        this.globalPts.init(state.pts);
    }

    isStale(): boolean {
        return Boolean(this.state) && Date.now() - this.lastUpdateTime > NO_UPDATES_TIMEOUT_MS;
    }

    async recoverIfStale(): Promise<void> {
        if (!this.isStale()) return;
        this.client._log.debug("No updates for 15 minutes, fetching difference");
        try {
            await this.fetchDifferenceLoop();
        } catch (e) {
            this.client._log.error(`Stale-recovery failed: ${e}`);
        }
        this.lastUpdateTime = Date.now();
    }

    private handleContainer(update: Api.Updates | Api.UpdatesCombined): void {
        if (this.state && update.seq !== 0) {
            const seqStart = "seqStart" in update ? update.seqStart : update.seq;
            const localSeq = this.state.seq;
            if (seqStart !== 0) {
                if (localSeq + 1 > seqStart) {
                    this.client._log.debug(`Skip duplicate Updates container (seq=${seqStart})`);
                    return;
                }
                if (localSeq + 1 < seqStart) {
                    this.client._log.debug(`Seq gap (local=${localSeq}, start=${seqStart}); requesting difference`);
                    this.pendingSeq.push({ update, seqStart, seq: update.seq });
                    this.scheduleCommonDifference();
                    return;
                }
            }
            this.state.seq = update.seq;
            this.state.date = update.date;
        }

        const entities = this.collectEntities(update.users, update.chats);
        for (const u of update.updates) {
            this.feedUpdate(u, { others: update.updates, entities });
        }
    }

    private handleShortMessage(update: Api.UpdateShortMessage | Api.UpdateShortChatMessage): void {
        if (!this.state) {
            this.dispatch(update as unknown as Api.TypeUpdate, { others: null });
            return;
        }
        const applied = this.globalPts.updateAndApply(
            update.pts,
            update.ptsCount,
            { tag: "update", update: update as unknown as Api.TypeUpdate },
            (u) => {
                if (this.state) this.state.pts = update.pts;
                this.dispatch(u, { others: null });
            },
            () => {
                // updates-payload not used at this entry point
            },
        );
        if (applied) {
            this.state.date = update.date;
        }
    }

    private feedUpdate(update: Api.TypeUpdate, payload: DispatchPayload): void {
        if (!this.state) {
            this.dispatch(update, payload);
            return;
        }

        if (update instanceof Api.UpdateChannelTooLong) {
            const channelId = update.channelId.toString();
            const tracker = this.getOrCreateChannel(channelId);
            const serverPts = update.pts;
            if (!tracker.pts.inited()) {
                if (serverPts !== undefined) tracker.pts.init(serverPts);
            } else if (serverPts === undefined || tracker.pts.current() < serverPts) {
                this.client._log.debug(`UpdateChannelTooLong ch=${channelId}; requesting diff`);
                void this.fetchChannelDifference(channelId);
            }
            return;
        }

        if (isCommonPtsUpdate(update)) {
            const u = update as Api.TypeUpdate & { pts: number; ptsCount: number };
            this.globalPts.updateAndApply(
                u.pts,
                u.ptsCount,
                { tag: "update", update },
                (applied) => {
                    if (this.state) this.state.pts = u.pts;
                    this.dispatch(applied, payload);
                },
                () => {},
            );
            return;
        }

        if (isChannelPtsUpdate(update)) {
            const u = update as Api.TypeUpdate & { pts: number; ptsCount: number };
            const channelId = getChannelId(update);
            if (!channelId || !u.pts || !u.ptsCount) {
                this.dispatch(update, payload);
                return;
            }
            const tracker = this.getOrCreateChannel(channelId);
            if (!tracker.pts.inited()) {
                tracker.pts.init(u.pts);
                this.dispatch(update, payload);
                return;
            }
            tracker.pts.updateAndApply(
                u.pts,
                u.ptsCount,
                { tag: "update", update },
                (applied) => this.dispatch(applied, payload),
                () => {},
            );
            return;
        }

        if (hasQts(update)) {
            const localQts = this.state.qts;
            const qts = update.qts;
            if (localQts + 1 > qts) {
                this.client._log.debug(`Skip duplicate qts (local=${localQts}, qts=${qts})`);
                return;
            }
            if (localQts + 1 < qts) {
                this.client._log.debug(`Qts gap (local=${localQts}, qts=${qts}); requesting difference`);
                this.scheduleCommonDifference();
                return;
            }
            this.state.qts = qts;
        }

        this.dispatch(update, payload);
    }

    private dispatch(update: Api.TypeUpdate, payload: DispatchPayload): void {
        if (this.isDuplicateMessage(update)) {
            this.client._log.debug("Skip duplicate message update (already dispatched)");
            return;
        }
        (update as unknown as { _entities: Map<string, unknown> })._entities = payload.entities ?? new Map();
        _dispatchUpdate(this.client, { update }).catch((e) =>
            this.client._log.error(`Error dispatching update: ${e}`),
        );
    }

    private isDuplicateMessage(update: Api.TypeUpdate): boolean {
        if (
            !(update instanceof Api.UpdateNewMessage) &&
            !(update instanceof Api.UpdateNewChannelMessage)
        ) {
            return false;
        }
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
        if (this.recentMessageQueue.length > RECENT_MESSAGE_BUFFER_SIZE) {
            const old = this.recentMessageQueue.shift()!;
            this.recentMessageKeys.delete(old);
        }
        return false;
    }

    private async saveEntities(tlo: unknown): Promise<void> {
        try {
            await this.client.session.processEntities(tlo);
        } catch (e) {
            this.client._log.warn(`session.processEntities failed: ${e}`);
        }
    }

    private collectEntities(
        users: Api.TypeUser[],
        chats: Api.TypeChat[],
    ): Map<string, Api.TypeUser | Api.TypeChat> {
        const entities = new Map<string, Api.TypeUser | Api.TypeChat>();
        for (const x of [...users, ...chats]) {
            try {
                entities.set(utils.getPeerId(x), x);
            } catch {
                // skip unrecognised entity
            }
        }
        return entities;
    }

    private makeGlobalWaiter(): PtsWaiter {
        const host: PtsWaiterHost = {
            onWaitForSkipped: (ms) => {
                if (ms < 0) {
                    if (this.globalPtsTimer) {
                        clearTimeout(this.globalPtsTimer);
                        this.globalPtsTimer = undefined;
                    }
                    return;
                }
                if (this.globalPtsTimer) clearTimeout(this.globalPtsTimer);
                this.globalPtsTimer = setTimeout(() => {
                    this.globalPtsTimer = undefined;
                    this.scheduleCommonDifference();
                }, ms);
            },
            onWaitForShortPoll: () => {
                // not used; keep no-op
            },
        };
        return new PtsWaiter(host);
    }

    private getOrCreateChannel(channelId: string): ChannelTracker {
        let tracker = this.channels.get(channelId);
        if (tracker) return tracker;

        const host: PtsWaiterHost = {
            onWaitForSkipped: (ms) => {
                const t = this.channels.get(channelId);
                if (!t) return;
                if (ms < 0) {
                    if (t.timer) {
                        clearTimeout(t.timer);
                        t.timer = undefined;
                    }
                    return;
                }
                if (t.timer) clearTimeout(t.timer);
                t.timer = setTimeout(() => {
                    t.timer = undefined;
                    void this.fetchChannelDifference(channelId);
                }, ms);
            },
            onWaitForShortPoll: () => {},
        };
        tracker = { pts: new PtsWaiter(host) };
        this.channels.set(channelId, tracker);
        return tracker;
    }

    private scheduleCommonDifference(): void {
        if (this.fetchingDifference) return;
        if (this.failRetryTimer) return;
        void this.fetchCommonDifference();
    }

    private async fetchCommonDifference(): Promise<void> {
        if (this.fetchingDifference || !this.state) return;
        this.fetchingDifference = true;
        this.globalPts.setRequesting(true);
        let failed = false;
        try {
            await this.fetchDifferenceLoop();
            this.failTimeoutS = FAIL_DIFFERENCE_INITIAL_S;
        } catch (e) {
            failed = true;
            this.client._log.error(`fetchCommonDifference: ${e}`);
        } finally {
            this.globalPts.setRequesting(false);
            if (this.state) this.globalPts.init(this.state.pts);
            this.fetchingDifference = false;
            this.drainPendingSeq();
        }
        if (failed && this.running) {
            const delayMs = this.failTimeoutS * 1000;
            this.bumpFailTimeout();
            this.client._log.debug(`Retry common difference in ${delayMs}ms`);
            this.failRetryTimer = setTimeout(() => {
                this.failRetryTimer = undefined;
                this.scheduleCommonDifference();
            }, delayMs);
        }
    }

    private async fetchDifferenceLoop(): Promise<void> {
        if (!this.state) return;
        let fetching = true;
        while (fetching) {
            const diff: Api.updates.TypeDifference =
                await this.client.api.updates.getDifference({
                    pts: this.state.pts,
                    date: this.state.date,
                    qts: this.state.qts,
                });

            if (diff instanceof Api.updates.DifferenceEmpty) {
                this.state.date = diff.date;
                this.state.seq = diff.seq;
                fetching = false;
            } else if (diff instanceof Api.updates.Difference) {
                await this.processDifference(diff);
                this.state = { ...diff.state };
                fetching = false;
            } else if (diff instanceof Api.updates.DifferenceSlice) {
                await this.processDifference(diff);
                this.state = { ...diff.intermediateState };
            } else if (diff instanceof Api.updates.DifferenceTooLong) {
                this.state.pts = diff.pts;
                fetching = false;
                this.client._log.warn("getDifference: too long, some updates may be lost");
            }
        }
    }

    private async processDifference(diff: Api.updates.Difference | Api.updates.DifferenceSlice): Promise<void> {
        const entities = this.collectEntities(diff.users, diff.chats);
        this.client._entityCache.add(diff);
        await this.saveEntities(diff);

        for (const message of diff.newMessages) {
            if (message instanceof Api.Message || message instanceof Api.MessageService) {
                this.dispatch(
                    new Api.UpdateNewMessage({ message, pts: 0, ptsCount: 0 }),
                    { others: null, entities },
                );
            }
        }
        for (const update of diff.otherUpdates) {
            this.dispatch(update, { others: diff.otherUpdates, entities });
        }
    }

    private drainPendingSeq(): void {
        if (!this.state || this.pendingSeq.length === 0) return;
        const list = this.pendingSeq.splice(0);
        list.sort((a, b) => a.seqStart - b.seqStart);
        for (const entry of list) {
            if (this.state.seq + 1 === entry.seqStart) {
                this.onUpdates(entry.update);
            }
            // else drop — diff has covered it
        }
    }

    private async fetchChannelDifference(channelId: string): Promise<void> {
        const tracker = this.channels.get(channelId);
        if (!tracker || tracker.pts.requesting()) return;
        if (!tracker.pts.inited()) return;
        if (this.channelFailRetryTimers.has(channelId)) return;

        tracker.pts.setRequesting(true);
        let failed = false;
        try {
            const inputChannel = await this.resolveChannel(channelId, tracker);
            if (!inputChannel) {
                this.client._log.warn(`Cannot resolve channel ${channelId}; skipping diff`);
                return;
            }
            tracker.inputChannel = inputChannel;

            let fetching = true;
            while (fetching) {
                const diff = await this.client.invoke(
                    new Api.updates.GetChannelDifference({
                        channel: inputChannel,
                        filter: new Api.ChannelMessagesFilterEmpty(),
                        pts: tracker.pts.current(),
                        limit: CHANNEL_DIFFERENCE_LIMIT,
                    }),
                );

                if (diff instanceof Api.updates.ChannelDifferenceEmpty) {
                    if (diff.pts) tracker.pts.init(diff.pts);
                    fetching = false;
                } else if (diff instanceof Api.updates.ChannelDifference) {
                    const entities = this.collectEntities(diff.users, diff.chats);
                    this.client._entityCache.add(diff);
                    await this.saveEntities(diff);

                    for (const message of diff.newMessages) {
                        if (message instanceof Api.Message || message instanceof Api.MessageService) {
                            this.dispatch(
                                new Api.UpdateNewChannelMessage({ message, pts: 0, ptsCount: 0 }),
                                { others: null, entities },
                            );
                        }
                    }
                    for (const update of diff.otherUpdates) {
                        this.dispatch(update, { others: diff.otherUpdates, entities });
                    }
                    tracker.pts.init(diff.pts);
                    fetching = !diff.final;
                } else if (diff instanceof Api.updates.ChannelDifferenceTooLong) {
                    this.client._log.warn(`Channel ${channelId} difference too long`);
                    const dialog = diff.dialog as { pts?: number };
                    if (dialog.pts !== undefined) tracker.pts.init(dialog.pts);
                    fetching = false;
                }
            }
            this.channelFailTimeoutS.delete(channelId);
        } catch (e) {
            failed = true;
            this.client._log.error(`fetchChannelDifference ${channelId}: ${e}`);
        } finally {
            tracker.pts.setRequesting(false);
        }
        if (failed && this.running) {
            const delayMs = (this.channelFailTimeoutS.get(channelId) ?? FAIL_DIFFERENCE_INITIAL_S) * 1000;
            this.bumpChannelFailTimeout(channelId);
            this.client._log.debug(`Retry channel ${channelId} difference in ${delayMs}ms`);
            const timer = setTimeout(() => {
                this.channelFailRetryTimers.delete(channelId);
                void this.fetchChannelDifference(channelId);
            }, delayMs);
            this.channelFailRetryTimers.set(channelId, timer);
        }
    }

    private async resolveChannel(
        channelId: string,
        tracker: ChannelTracker,
    ): Promise<Api.TypeInputChannel | undefined> {
        if (tracker.inputChannel) return tracker.inputChannel;
        try {
            const peer = new Api.PeerChannel({ channelId: returnBigInt(channelId) });
            const input = await this.client.getInputEntity(peer);
            if (input instanceof Api.InputPeerChannel) {
                return new Api.InputChannel({ channelId: input.channelId, accessHash: input.accessHash });
            }
        } catch {
            // ignore
        }
        return undefined;
    }

    private bumpFailTimeout(): void {
        if (this.failTimeoutS < FAIL_DIFFERENCE_CAP_S) {
            this.failTimeoutS = Math.min(this.failTimeoutS * 2, FAIL_DIFFERENCE_CAP_S);
        }
    }

    private bumpChannelFailTimeout(channelId: string): void {
        const cur = this.channelFailTimeoutS.get(channelId) ?? FAIL_DIFFERENCE_INITIAL_S;
        if (cur < FAIL_DIFFERENCE_CAP_S) {
            this.channelFailTimeoutS.set(channelId, Math.min(cur * 2, FAIL_DIFFERENCE_CAP_S));
        }
    }
}
