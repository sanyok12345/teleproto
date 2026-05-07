import bigInt from "big-integer";
import { Api } from "../tl";
import * as utils from "../Utils";
import { returnBigInt } from "../Helpers";
import type { TelegramClient } from "./TelegramClient";
import { _dispatchUpdate } from "./updates";

const NO_UPDATES_TIMEOUT_MS = 15 * 60 * 1000;
const PENDING_UPDATE_TTL_MS = 60_000;
const FAIL_DIFFERENCE_INITIAL_S = 1;
const FAIL_DIFFERENCE_CAP_S = 64;
const CHANNEL_DIFFERENCE_LIMIT = 100;
const MAX_RECOVERY_ROUNDS = 3;

export interface UpdateState {
    pts: number;
    qts: number;
    date: number;
    seq: number;
}

interface PendingPtsUpdate {
    update: Api.TypeUpdate;
    pts: number;
    ptsCount: number;
    others: Api.TypeUpdate[] | null;
    entities?: Map<string, Api.TypeUser | Api.TypeChat>;
    bufferedAt: number;
}

interface PendingSeqUpdate {
    update: Api.Updates | Api.UpdatesCombined;
    seqStart: number;
    seq: number;
    bufferedAt: number;
}

interface PendingQtsUpdate {
    update: Api.TypeUpdate;
    qts: number;
    others: Api.TypeUpdate[] | null;
    entities?: Map<string, Api.TypeUser | Api.TypeChat>;
    bufferedAt: number;
}

interface PendingChannelUpdate {
    update: Api.TypeUpdate;
    pts: number;
    ptsCount: number;
    others: Api.TypeUpdate[] | null;
    entities?: Map<string, Api.TypeUser | Api.TypeChat>;
    bufferedAt: number;
}

type PtsCheck = "apply" | "duplicate" | "gap";

function checkPts(localPts: number, pts: number, ptsCount: number): PtsCheck {
    const expected = localPts + ptsCount;
    if (expected === pts) return "apply";
    if (expected > pts) return "duplicate";
    return "gap";
}

function checkSeq(localSeq: number, seqStart: number): PtsCheck {
    if (seqStart === 0) return "apply";
    if (localSeq + 1 === seqStart) return "apply";
    if (localSeq + 1 > seqStart) return "duplicate";
    return "gap";
}

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
    private readonly pendingPts: PendingPtsUpdate[] = [];
    private readonly pendingSeq: PendingSeqUpdate[] = [];
    private readonly pendingQts: PendingQtsUpdate[] = [];
    private readonly pendingChannel = new Map<string, PendingChannelUpdate[]>();
    private readonly channelPts = new Map<string, number>();

    private fetchingDifference = false;
    private readonly fetchingChannelDifference = new Set<string>();

    private failTimeoutS = FAIL_DIFFERENCE_INITIAL_S;
    private readonly channelFailTimeoutS = new Map<string, number>();

    private running = false;

    constructor(client: TelegramClient) {
        this.client = client;
    }

    start(): void {
        this.running = true;
    }

    stop(): void {
        this.running = false;
        this.pendingPts.length = 0;
        this.pendingSeq.length = 0;
        this.pendingQts.length = 0;
        this.pendingChannel.clear();
        this.channelPts.clear();
        this.fetchingDifference = false;
        this.fetchingChannelDifference.clear();
        this.failTimeoutS = FAIL_DIFFERENCE_INITIAL_S;
        this.channelFailTimeoutS.clear();
    }

    onUpdates(update: Api.TypeUpdate | Api.TypeUpdates): void {
        if (!this.running) return;
        try {
            this.lastUpdateTime = Date.now();
            this.client._entityCache.add(update as never);
            this.client.session.processEntities(update);

            if (update instanceof Api.Updates || update instanceof Api.UpdatesCombined) {
                this.handleContainer(update);
            } else if (update instanceof Api.UpdateShort) {
                if (this.state) this.state.date = update.date;
                this.feedUpdate(update.update, null);
            } else if (update instanceof Api.UpdateShortMessage || update instanceof Api.UpdateShortChatMessage) {
                this.handleShortMessage(update);
            } else if ((update as { className?: string }).className === "UpdatesTooLong") {
                this.client._log.warn("Received UpdatesTooLong, recovering common gap");
                this.recoverCommonGap().catch((e) => this.client._log.error(`UpdatesTooLong recovery: ${e}`));
            } else {
                this.feedUpdate(update as Api.TypeUpdate, null);
            }
        } catch (e) {
            this.client._log.error(`Error in onUpdates: ${e}`);
        }
    }

    async catchUp(): Promise<void> {
        try {
            if (!this.state) {
                const s = await this.client.invoke(new Api.updates.GetState());
                this.state = { pts: s.pts, qts: s.qts, date: s.date, seq: s.seq };
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
            const s = await this.client.invoke(new Api.updates.GetState());
            this.state = { pts: s.pts, qts: s.qts, date: s.date, seq: s.seq };
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
            this.state = { pts: state.pts, qts: state.qts, date: state.date, seq: state.seq };
        }
    }

    isStale(): boolean {
        return Boolean(this.state) && Date.now() - this.lastUpdateTime > NO_UPDATES_TIMEOUT_MS;
    }

    async recoverIfStale(): Promise<void> {
        if (!this.isStale()) return;
        this.client._log.debug("No updates for 15 minutes, fetching difference");
        try {
            await this.recoverCommonGap();
        } catch (e) {
            this.client._log.error(`Stale-recovery failed: ${e}`);
        }
        this.lastUpdateTime = Date.now();
    }

    private handleContainer(update: Api.Updates | Api.UpdatesCombined): void {
        if (this.state && update.seq !== 0) {
            const seqStart = "seqStart" in update ? update.seqStart : update.seq;
            const result = checkSeq(this.state.seq, seqStart);

            if (result === "duplicate") {
                this.client._log.debug(`Skipping duplicate Updates container (seq=${seqStart})`);
                return;
            }
            if (result === "gap") {
                this.client._log.debug(`Seq gap (local=${this.state.seq}, start=${seqStart}), buffering`);
                this.pendingSeq.push({ update, seqStart, seq: update.seq, bufferedAt: Date.now() });
                this.recoverCommonGap().catch((e) => this.client._log.error(`Seq gap recovery: ${e}`));
                return;
            }

            this.state.seq = update.seq;
            this.state.date = update.date;
        }

        const entities = new Map<string, Api.TypeUser | Api.TypeChat>();
        for (const x of [...update.users, ...update.chats]) {
            try {
                entities.set(utils.getPeerId(x), x);
            } catch {
                // skip unrecognised entity
            }
        }
        for (const u of update.updates) {
            this.feedUpdate(u, update.updates, entities);
        }
    }

    private handleShortMessage(update: Api.UpdateShortMessage | Api.UpdateShortChatMessage): void {
        if (this.state) {
            const result = checkPts(this.state.pts, update.pts, update.ptsCount);
            if (result === "duplicate") {
                this.client._log.debug(`Skipping duplicate ShortMessage (pts=${update.pts})`);
                return;
            }
            if (result === "gap") {
                this.client._log.debug(`Pts gap in ShortMessage (local=${this.state.pts}, pts=${update.pts}), buffering`);
                this.pendingPts.push({
                    update: update as unknown as Api.TypeUpdate,
                    pts: update.pts,
                    ptsCount: update.ptsCount,
                    others: null,
                    bufferedAt: Date.now(),
                });
                this.recoverCommonGap().catch((e) => this.client._log.error(`Short pts recovery: ${e}`));
                return;
            }
            this.state.pts = update.pts;
            this.state.date = update.date;
        }
        this.dispatch(update as unknown as Api.TypeUpdate, null);
    }

    private feedUpdate(
        update: Api.TypeUpdate,
        others: Api.TypeUpdate[] | null,
        entities?: Map<string, Api.TypeUser | Api.TypeChat>,
    ): void {
        if (this.state) {
            if (isCommonPtsUpdate(update)) {
                const u = update as Api.TypeUpdate & { pts: number; ptsCount: number };
                const result = checkPts(this.state.pts, u.pts, u.ptsCount);
                if (result === "duplicate") {
                    this.client._log.debug(`Skip duplicate ${u.className} (pts=${u.pts})`);
                    return;
                }
                if (result === "gap") {
                    this.client._log.debug(`Pts gap for ${u.className} (local=${this.state.pts}, pts=${u.pts}), buffering`);
                    this.pendingPts.push({
                        update,
                        pts: u.pts,
                        ptsCount: u.ptsCount,
                        others,
                        entities,
                        bufferedAt: Date.now(),
                    });
                    this.recoverCommonGap().catch((e) => this.client._log.error(`Pts gap recovery: ${e}`));
                    return;
                }
                this.state.pts = u.pts;
            } else if (isChannelPtsUpdate(update)) {
                const u = update as Api.TypeUpdate & { pts: number; ptsCount: number };
                const channelId = getChannelId(update);
                if (channelId && u.pts && u.ptsCount) {
                    const localPts = this.channelPts.get(channelId);
                    if (localPts !== undefined) {
                        const result = checkPts(localPts, u.pts, u.ptsCount);
                        if (result === "duplicate") {
                            this.client._log.debug(`Skip duplicate channel ${u.className} (ch=${channelId})`);
                            return;
                        }
                        if (result === "gap") {
                            this.client._log.debug(`Channel pts gap for ${u.className} (ch=${channelId}, local=${localPts}, pts=${u.pts}), buffering`);
                            const pending = this.pendingChannel.get(channelId) ?? [];
                            pending.push({
                                update,
                                pts: u.pts,
                                ptsCount: u.ptsCount,
                                others,
                                entities,
                                bufferedAt: Date.now(),
                            });
                            this.pendingChannel.set(channelId, pending);
                            this.recoverChannelGap(channelId).catch((e) =>
                                this.client._log.error(`Channel gap recovery: ${e}`),
                            );
                            return;
                        }
                    }
                    this.channelPts.set(channelId, u.pts);
                }
            } else if (hasQts(update)) {
                const localQts = this.state.qts;
                const qts = update.qts;
                if (localQts + 1 > qts) {
                    this.client._log.debug(`Skip duplicate qts (local=${localQts}, qts=${qts})`);
                    return;
                }
                if (localQts + 1 < qts) {
                    this.client._log.debug(`Qts gap (local=${localQts}, qts=${qts}), buffering`);
                    this.pendingQts.push({ update, qts, others, entities, bufferedAt: Date.now() });
                    this.recoverCommonGap().catch((e) => this.client._log.error(`Qts gap recovery: ${e}`));
                    return;
                }
                this.state.qts = qts;
            }
        }

        this.dispatch(update, others, entities);
    }

    private dispatch(
        update: Api.TypeUpdate,
        others: Api.TypeUpdate[] | null,
        entities?: Map<string, Api.TypeUser | Api.TypeChat>,
    ): void {
        (update as unknown as { _entities: Map<string, unknown> })._entities = entities ?? new Map();
        void others;
        _dispatchUpdate(this.client, { update }).catch((e) =>
            this.client._log.error(`Error dispatching update: ${e}`),
        );
    }

    private async recoverCommonGap(): Promise<void> {
        if (this.fetchingDifference || !this.state) return;
        this.fetchingDifference = true;
        try {
            await this.fetchDifferenceLoop();
            this.client._log.debug("Common gap recovery complete; flushing pending");
            this.flushPendingPts();
            this.flushPendingSeq();
            this.flushPendingQts();

            for (let retry = 0; retry < MAX_RECOVERY_ROUNDS - 1; retry++) {
                const stillHasGaps =
                    this.pendingPts.length > 0 ||
                    this.pendingSeq.length > 0 ||
                    this.pendingQts.length > 0;
                if (!stillHasGaps) break;
                this.client._log.debug(
                    `Pending after flush: ${this.pendingPts.length} pts, ${this.pendingSeq.length} seq, ${this.pendingQts.length} qts; retrying`,
                );
                await this.fetchDifferenceLoop();
                this.flushPendingPts();
                this.flushPendingSeq();
                this.flushPendingQts();
            }
            this.failTimeoutS = FAIL_DIFFERENCE_INITIAL_S;
        } catch (e) {
            this.client._log.error(`recoverCommonGap: ${e}`);
            this.bumpFailTimeout();
            this.forceFlushAllPending();
        } finally {
            this.fetchingDifference = false;
        }
    }

    private async fetchDifferenceLoop(): Promise<void> {
        if (!this.state) return;
        let fetching = true;
        while (fetching) {
            const diff: Api.updates.TypeDifference = await this.client.invoke(
                new Api.updates.GetDifference({
                    pts: this.state.pts,
                    date: this.state.date,
                    qts: this.state.qts,
                }),
            );

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
        const entities = new Map<string, Api.TypeUser | Api.TypeChat>();
        for (const u of diff.users) {
            try {
                entities.set(utils.getPeerId(u), u);
            } catch {
                // skip
            }
        }
        for (const c of diff.chats) {
            try {
                entities.set(utils.getPeerId(c), c);
            } catch {
                // skip
            }
        }

        this.client._entityCache.add(diff);
        this.client.session.processEntities(diff);

        for (const message of diff.newMessages) {
            if (message instanceof Api.Message || message instanceof Api.MessageService) {
                this.dispatch(
                    new Api.UpdateNewMessage({ message, pts: 0, ptsCount: 0 }),
                    null,
                    entities,
                );
            }
        }
        for (const update of diff.otherUpdates) {
            this.dispatch(update, diff.otherUpdates, entities);
        }
    }

    private async recoverChannelGap(channelId: string): Promise<void> {
        if (this.fetchingChannelDifference.has(channelId)) return;
        this.fetchingChannelDifference.add(channelId);

        try {
            for (let round = 0; round < MAX_RECOVERY_ROUNDS; round++) {
                const localPts = this.channelPts.get(channelId);
                if (localPts === undefined) {
                    this.flushPendingChannel(channelId);
                    return;
                }

                const inputChannel = await this.resolveChannel(channelId);
                if (!inputChannel) {
                    this.client._log.warn(`Cannot resolve channel ${channelId}, flushing pending`);
                    this.flushPendingChannel(channelId);
                    return;
                }

                this.client._log.debug(`Recovering channel gap ${channelId} round ${round + 1}`);
                let fetching = true;
                while (fetching) {
                    const currentPts = this.channelPts.get(channelId) ?? localPts;
                    const diff = await this.client.invoke(
                        new Api.updates.GetChannelDifference({
                            channel: inputChannel,
                            filter: new Api.ChannelMessagesFilterEmpty(),
                            pts: currentPts,
                            limit: CHANNEL_DIFFERENCE_LIMIT,
                        }),
                    );

                    if (diff instanceof Api.updates.ChannelDifferenceEmpty) {
                        if (diff.pts) this.channelPts.set(channelId, diff.pts);
                        fetching = false;
                    } else if (diff instanceof Api.updates.ChannelDifference) {
                        const entities = new Map<string, Api.TypeUser | Api.TypeChat>();
                        for (const u of diff.users) {
                            try {
                                entities.set(utils.getPeerId(u), u);
                            } catch {
                                // skip
                            }
                        }
                        for (const c of diff.chats) {
                            try {
                                entities.set(utils.getPeerId(c), c);
                            } catch {
                                // skip
                            }
                        }
                        this.client._entityCache.add(diff);
                        this.client.session.processEntities(diff);

                        for (const message of diff.newMessages) {
                            if (message instanceof Api.Message || message instanceof Api.MessageService) {
                                this.dispatch(
                                    new Api.UpdateNewChannelMessage({ message, pts: 0, ptsCount: 0 }),
                                    null,
                                    entities,
                                );
                            }
                        }
                        for (const update of diff.otherUpdates) {
                            this.dispatch(update, diff.otherUpdates, entities);
                        }

                        this.channelPts.set(channelId, diff.pts);
                        fetching = !diff.final;
                    } else if (diff instanceof Api.updates.ChannelDifferenceTooLong) {
                        this.client._log.warn(`Channel ${channelId} difference too long`);
                        const dialog = diff.dialog as { pts?: number };
                        if (dialog.pts !== undefined) this.channelPts.set(channelId, dialog.pts);
                        fetching = false;
                    }
                }

                this.flushPendingChannel(channelId);
                const stillPending = this.pendingChannel.get(channelId);
                if (!stillPending || stillPending.length === 0) break;
                this.client._log.debug(`Channel ${channelId} still has ${stillPending.length} pending; retry`);
            }
            this.channelFailTimeoutS.delete(channelId);
        } catch (e) {
            this.client._log.error(`recoverChannelGap ${channelId}: ${e}`);
            this.bumpChannelFailTimeout(channelId);
            this.flushPendingChannel(channelId);
        } finally {
            this.fetchingChannelDifference.delete(channelId);
        }
    }

    private async resolveChannel(channelId: string): Promise<Api.TypeInputChannel | undefined> {
        try {
            const peer = new Api.PeerChannel({ channelId: returnBigInt(channelId) });
            const input = await this.client.getInputEntity(peer);
            if (input instanceof Api.InputPeerChannel) {
                return new Api.InputChannel({ channelId: input.channelId, accessHash: input.accessHash });
            }
        } catch {
            // fall through
        }
        const pending = this.pendingChannel.get(channelId);
        if (!pending) return undefined;
        for (const entry of pending) {
            if (!entry.entities) continue;
            for (const [, entity] of entry.entities) {
                try {
                    const ip = utils.getInputPeer(entity);
                    if (ip instanceof Api.InputPeerChannel && ip.channelId.toString() === channelId) {
                        return new Api.InputChannel({ channelId: ip.channelId, accessHash: ip.accessHash });
                    }
                } catch {
                    // skip
                }
            }
        }
        return undefined;
    }

    private flushPendingPts(): void {
        if (!this.state) return;
        const now = Date.now();
        this.pendingPts.sort((a, b) => a.pts - b.pts);
        const remaining: PendingPtsUpdate[] = [];
        for (const entry of this.pendingPts) {
            if (now - entry.bufferedAt > PENDING_UPDATE_TTL_MS) {
                this.client._log.debug(`Drop stale pending pts (age=${now - entry.bufferedAt}ms)`);
                continue;
            }
            const result = checkPts(this.state.pts, entry.pts, entry.ptsCount);
            if (result === "apply") {
                this.state.pts = entry.pts;
                this.dispatch(entry.update, entry.others, entry.entities);
            } else if (result === "gap") {
                remaining.push(entry);
            }
        }
        this.pendingPts.length = 0;
        this.pendingPts.push(...remaining);
    }

    private flushPendingSeq(): void {
        if (!this.state) return;
        const now = Date.now();
        this.pendingSeq.sort((a, b) => a.seqStart - b.seqStart);
        const remaining: PendingSeqUpdate[] = [];
        for (const entry of this.pendingSeq) {
            if (now - entry.bufferedAt > PENDING_UPDATE_TTL_MS) {
                this.client._log.debug(`Drop stale pending seq (age=${now - entry.bufferedAt}ms)`);
                continue;
            }
            const result = checkSeq(this.state.seq, entry.seqStart);
            if (result === "apply") {
                this.state.seq = entry.seq;
                this.onUpdates(entry.update);
            } else if (result === "gap") {
                remaining.push(entry);
            }
        }
        this.pendingSeq.length = 0;
        this.pendingSeq.push(...remaining);
    }

    private flushPendingQts(): void {
        if (!this.state) return;
        const now = Date.now();
        this.pendingQts.sort((a, b) => a.qts - b.qts);
        const remaining: PendingQtsUpdate[] = [];
        for (const entry of this.pendingQts) {
            if (now - entry.bufferedAt > PENDING_UPDATE_TTL_MS) {
                this.client._log.debug(`Drop stale pending qts (age=${now - entry.bufferedAt}ms)`);
                continue;
            }
            const localQts = this.state.qts;
            if (localQts + 1 === entry.qts) {
                this.state.qts = entry.qts;
                this.dispatch(entry.update, entry.others, entry.entities);
            } else if (localQts + 1 < entry.qts) {
                remaining.push(entry);
            }
        }
        this.pendingQts.length = 0;
        this.pendingQts.push(...remaining);
    }

    private flushPendingChannel(channelId: string): void {
        const pending = this.pendingChannel.get(channelId);
        if (!pending || pending.length === 0) {
            this.pendingChannel.delete(channelId);
            return;
        }
        const now = Date.now();
        const localPts = this.channelPts.get(channelId);
        pending.sort((a, b) => a.pts - b.pts);
        const remaining: PendingChannelUpdate[] = [];
        for (const entry of pending) {
            if (now - entry.bufferedAt > PENDING_UPDATE_TTL_MS) {
                this.client._log.debug(`Drop stale channel pending ch=${channelId} (age=${now - entry.bufferedAt}ms)`);
                continue;
            }
            if (localPts !== undefined) {
                const result = checkPts(localPts, entry.pts, entry.ptsCount);
                if (result === "apply") {
                    this.channelPts.set(channelId, entry.pts);
                    this.dispatch(entry.update, entry.others, entry.entities);
                } else if (result === "gap") {
                    remaining.push(entry);
                }
            } else {
                this.channelPts.set(channelId, entry.pts);
                this.dispatch(entry.update, entry.others, entry.entities);
            }
        }
        if (remaining.length > 0) this.pendingChannel.set(channelId, remaining);
        else this.pendingChannel.delete(channelId);
    }

    private forceFlushAllPending(): void {
        for (const entry of this.pendingPts) this.dispatch(entry.update, entry.others, entry.entities);
        this.pendingPts.length = 0;
        for (const entry of this.pendingSeq) this.onUpdates(entry.update);
        this.pendingSeq.length = 0;
        for (const entry of this.pendingQts) this.dispatch(entry.update, entry.others, entry.entities);
        this.pendingQts.length = 0;
        for (const [, entries] of this.pendingChannel) {
            for (const entry of entries) this.dispatch(entry.update, entry.others, entry.entities);
        }
        this.pendingChannel.clear();
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

export const UPDATE_MANAGER_CONSTANTS = {
    NO_UPDATES_TIMEOUT_MS,
    PENDING_UPDATE_TTL_MS,
    FAIL_DIFFERENCE_INITIAL_S,
    FAIL_DIFFERENCE_CAP_S,
    CHANNEL_DIFFERENCE_LIMIT,
} as const;
