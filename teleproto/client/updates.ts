import type { EventBuilder } from "../events/common";
import { Api } from "../tl";
import type { TelegramClient } from "./TelegramClient";
import { UpdateConnectionState } from "../network";
import type { Raw } from "../events";
import * as utils from "../Utils";
import { getRandomInt, returnBigInt, sleep } from "../Helpers";
import Timeout = NodeJS.Timeout;

const PING_INTERVAL = 9000; // 9 sec
const PING_TIMEOUT = 10000; // 10 sec
const PING_FAIL_ATTEMPTS = 3;
const PING_FAIL_INTERVAL = 100; // ms
const PING_DISCONNECT_DELAY = 60000; // 1 min
// An unusually long interval is a sign of returning from background mode...
const PING_INTERVAL_TO_WAKE_UP = 5000; // 5 sec
// ... so we send a quick "wake-up" ping to confirm than connection was dropped ASAP
const PING_WAKE_UP_TIMEOUT = 3000; // 3 sec
// We also send a warning to the user even a bit more quickly
const PING_WAKE_UP_WARNING_TIMEOUT = 1000; // 1 sec

// Per Telegram docs: if no updates for 15 minutes, fetch difference
const NO_UPDATES_TIMEOUT = 15 * 60 * 1000; // 15 min

// Max time a pending update can sit in the buffer before being dropped
const PENDING_UPDATE_TTL = 60_000; // 60 sec


/**
 If this exception is raised in any of the handlers for a given event,
 it will stop the execution of all other registered event handlers.
 It can be seen as the ``StopIteration`` in a for loop but for events.
 */
export class StopPropagation extends Error { }

/** @hidden */
export function on(client: TelegramClient, event?: EventBuilder) {
    return (f: { (event: any): void }) => {
        client.addEventHandler(f, event);
        return f;
    };
}

/** @hidden */
export function addEventHandler(
    client: TelegramClient,
    callback: CallableFunction,
    event?: EventBuilder
) {
    if (event == undefined) {
        // recursive imports :(
        const raw = require("../events/Raw").Raw;
        event = new raw({}) as Raw;
    }
    event.client = client;
    client._eventBuilders.push([event, callback]);
}

/** @hidden */
export function removeEventHandler(
    client: TelegramClient,
    callback: CallableFunction,
    event: EventBuilder
) {
    client._eventBuilders = client._eventBuilders.filter(function (item) {
        return item[0] !== event && item[1] !== callback;
    });
}

/** @hidden */
export function listEventHandlers(client: TelegramClient) {
    return client._eventBuilders;
}


/** Common (non-channel) updates carrying pts + ptsCount */
function _isCommonPtsUpdate(update: any): boolean {
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

/** Channel updates carrying pts + ptsCount (each channel has its own pts) */
function _isChannelPtsUpdate(update: any): boolean {
    return (
        update instanceof Api.UpdateNewChannelMessage ||
        update instanceof Api.UpdateEditChannelMessage ||
        update instanceof Api.UpdateDeleteChannelMessages ||
        update instanceof Api.UpdateChannelWebPage ||
        update instanceof Api.UpdatePinnedChannelMessages
    );
}

/** Extract channelId from a channel-specific update */
function _getChannelId(update: any): string | undefined {
    if (update.channelId) {
        return update.channelId.toString();
    }
    if (update.message?.peerId instanceof Api.PeerChannel) {
        return update.message.peerId.channelId.toString();
    }
    return undefined;
}

/** Check whether an update carries a qts field */
function _hasQts(update: any): boolean {
    return typeof update.qts === "number";
}


type PtsCheckResult = "apply" | "duplicate" | "gap";

function _checkPts(localPts: number, pts: number, ptsCount: number): PtsCheckResult {
    const expected = localPts + ptsCount;
    if (expected === pts) return "apply";
    if (expected > pts) return "duplicate";
    return "gap";
}

function _checkSeq(localSeq: number, seqStart: number): PtsCheckResult {
    if (seqStart === 0) return "apply"; // no seq ordering
    if (localSeq + 1 === seqStart) return "apply";
    if (localSeq + 1 > seqStart) return "duplicate";
    return "gap";
}


/**
 * Fetches and processes any updates that were missed while disconnected.
 * Call this after reconnecting to ensure no updates are lost.
 */
export async function catchUp(client: TelegramClient): Promise<void> {
    try {
        // Get current state if we don't have one
        if (!client._updateState) {
            const state = await client.invoke(new Api.updates.GetState());
            client._updateState = {
                pts: state.pts,
                qts: state.qts,
                date: state.date,
                seq: state.seq,
            };
            client._log.debug("Initialized update state");
            return;
        }

        // Fetch missed updates
        client._log.debug("Catching up on missed updates...");
        let fetching = true;

        while (fetching) {
            const diff: Api.updates.TypeDifference = await client.invoke(
                new Api.updates.GetDifference({
                    pts: client._updateState.pts,
                    date: client._updateState.date,
                    qts: client._updateState.qts,
                })
            );

            if (diff instanceof Api.updates.DifferenceEmpty) {
                client._updateState.date = diff.date;
                client._updateState.seq = diff.seq;
                fetching = false;
            } else if (diff instanceof Api.updates.Difference) {
                // Process all missed updates
                await _processDifference(client, diff);
                client._updateState = {
                    pts: diff.state.pts,
                    qts: diff.state.qts,
                    date: diff.state.date,
                    seq: diff.state.seq,
                };
                fetching = false;
            } else if (diff instanceof Api.updates.DifferenceSlice) {
                // Process partial updates, continue fetching
                await _processDifference(client, diff);
                client._updateState = {
                    pts: diff.intermediateState.pts,
                    qts: diff.intermediateState.qts,
                    date: diff.intermediateState.date,
                    seq: diff.intermediateState.seq,
                };
                // Continue loop to fetch more
            } else if (diff instanceof Api.updates.DifferenceTooLong) {
                // Too many updates missed, just update pts and continue
                client._updateState.pts = diff.pts;
                fetching = false;
                client._log.warn("Too many updates missed, some may be lost");
            }
        }

        client._log.debug("Catch up complete");
    } catch (e) {
        client._log.error(`Error during catch up: ${e}`);
    }
}

/** @hidden */
async function _processDifference(
    client: TelegramClient,
    diff: Api.updates.Difference | Api.updates.DifferenceSlice
): Promise<void> {
    // Build entities map
    const entities = new Map();
    for (const user of diff.users) {
        try {
            entities.set(utils.getPeerId(user), user);
        } catch (e) {
            // Skip invalid
        }
    }
    for (const chat of diff.chats) {
        try {
            entities.set(utils.getPeerId(chat), chat);
        } catch (e) {
            // Skip invalid
        }
    }

    // Process entities
    client._entityCache.add(diff);
    client.session.processEntities(diff);

    // Process new messages as updates
    for (const message of diff.newMessages) {
        if (message instanceof Api.Message || message instanceof Api.MessageService) {
            const update = new Api.UpdateNewMessage({
                message: message,
                pts: 0,
                ptsCount: 0,
            });
            _dispatchSingleUpdate(client, update, null, entities);
        }
    }

    // Process other updates (skip pts/seq checks — state is updated by caller)
    for (const update of diff.otherUpdates) {
        _dispatchSingleUpdate(client, update, diff.otherUpdates, entities);
    }
}

/**
 * Recover a common (pts/seq) gap by calling updates.getDifference.
 * Buffered updates are flushed after the gap is filled.
 * @hidden
 */
async function _recoverCommonGap(client: TelegramClient): Promise<void> {
    if (client._fetchingDifference || !client._updateState) return;
    client._fetchingDifference = true;

    try {
        client._log.debug("Recovering common gap via getDifference...");
        let fetching = true;

        while (fetching) {
            const diff: Api.updates.TypeDifference = await client.invoke(
                new Api.updates.GetDifference({
                    pts: client._updateState.pts,
                    date: client._updateState.date,
                    qts: client._updateState.qts,
                })
            );

            if (diff instanceof Api.updates.DifferenceEmpty) {
                client._updateState.date = diff.date;
                client._updateState.seq = diff.seq;
                fetching = false;
            } else if (diff instanceof Api.updates.Difference) {
                await _processDifference(client, diff);
                client._updateState = {
                    pts: diff.state.pts,
                    qts: diff.state.qts,
                    date: diff.state.date,
                    seq: diff.state.seq,
                };
                fetching = false;
            } else if (diff instanceof Api.updates.DifferenceSlice) {
                await _processDifference(client, diff);
                client._updateState = {
                    pts: diff.intermediateState.pts,
                    qts: diff.intermediateState.qts,
                    date: diff.intermediateState.date,
                    seq: diff.intermediateState.seq,
                };
            } else if (diff instanceof Api.updates.DifferenceTooLong) {
                client._updateState.pts = diff.pts;
                fetching = false;
                client._log.warn("getDifference: too long, some updates may be lost");
            }
        }

        client._log.debug("Common gap recovery complete, flushing pending updates");
        _flushPendingPtsUpdates(client);
        _flushPendingSeqUpdates(client);
        _flushPendingQtsUpdates(client);

        // Re-check: if still gaps remain after flush, getDifference again (up to 3 rounds)
        for (let retry = 0; retry < 2; retry++) {
            const stillHasGaps =
                client._pendingPtsUpdates.length > 0 ||
                client._pendingSeqUpdates.length > 0 ||
                client._pendingQtsUpdates.length > 0;
            if (!stillHasGaps) break;

            client._log.debug(`Still ${client._pendingPtsUpdates.length} pts + ${client._pendingSeqUpdates.length} seq + ${client._pendingQtsUpdates.length} qts pending, retrying getDifference...`);

            let fetching2 = true;
            while (fetching2) {
                const diff2: Api.updates.TypeDifference = await client.invoke(
                    new Api.updates.GetDifference({
                        pts: client._updateState.pts,
                        date: client._updateState.date,
                        qts: client._updateState.qts,
                    })
                );

                if (diff2 instanceof Api.updates.DifferenceEmpty) {
                    client._updateState.date = diff2.date;
                    client._updateState.seq = diff2.seq;
                    fetching2 = false;
                } else if (diff2 instanceof Api.updates.Difference) {
                    await _processDifference(client, diff2);
                    client._updateState = {
                        pts: diff2.state.pts, qts: diff2.state.qts,
                        date: diff2.state.date, seq: diff2.state.seq,
                    };
                    fetching2 = false;
                } else if (diff2 instanceof Api.updates.DifferenceSlice) {
                    await _processDifference(client, diff2);
                    client._updateState = {
                        pts: diff2.intermediateState.pts, qts: diff2.intermediateState.qts,
                        date: diff2.intermediateState.date, seq: diff2.intermediateState.seq,
                    };
                } else if (diff2 instanceof Api.updates.DifferenceTooLong) {
                    client._updateState.pts = diff2.pts;
                    fetching2 = false;
                }
            }

            _flushPendingPtsUpdates(client);
            _flushPendingSeqUpdates(client);
            _flushPendingQtsUpdates(client);
        }
    } catch (e) {
        client._log.error(`Error recovering common gap: ${e}`);
        // On failure, flush pending updates anyway to avoid them being stuck forever
        _forceFlushAllPending(client);
    } finally {
        client._fetchingDifference = false;
    }
}

/**
 * Recover a channel-specific gap by calling updates.getChannelDifference.
 * After flush, re-checks if remaining gaps exist and retries (up to 3 times).
 * @hidden
 */
async function _recoverChannelGap(client: TelegramClient, channelId: string): Promise<void> {
    if (client._fetchingChannelDifference.has(channelId)) return;
    client._fetchingChannelDifference.add(channelId);

    const MAX_RECOVERY_ROUNDS = 3;

    try {
        for (let round = 0; round < MAX_RECOVERY_ROUNDS; round++) {
            const localPts = client._channelPts.get(channelId);
            if (localPts === undefined) {
                _flushPendingChannelUpdates(client, channelId);
                return;
            }

            // Resolve the channel — try getInputEntity (cache → session → network)
            let inputChannel: Api.TypeEntityLike | undefined;

            try {
                const peer = new Api.PeerChannel({ channelId: returnBigInt(channelId) });
                inputChannel = await client.getInputEntity(peer);
            } catch (e) {
                // Ignore
            }

            if (!inputChannel) {
                // Last resort: try to build InputPeerChannel from buffered update entities
                const pending = client._pendingChannelUpdates.get(channelId);
                if (pending) {
                    for (const entry of pending) {
                        if (entry.entities) {
                            // The entities map from the parent Updates container may have the channel
                            for (const [, entity] of entry.entities) {
                                try {
                                    const ip = utils.getInputPeer(entity);
                                    if (ip instanceof Api.InputPeerChannel &&
                                        ip.channelId.toString() === channelId) {
                                        inputChannel = ip;
                                        break;
                                    }
                                } catch (e) { /* skip */ }
                            }
                            if (inputChannel) break;
                        }
                    }
                }
            }

            if (!inputChannel) {
                client._log.warn(`Cannot resolve channel ${channelId} for gap recovery, flushing pending`);
                _flushPendingChannelUpdates(client, channelId);
                return;
            }

            client._log.debug(`Recovering channel gap for ${channelId} (round ${round + 1})...`);
            let fetching = true;

            while (fetching) {
                const currentPts = client._channelPts.get(channelId) || localPts;
                const diff: Api.updates.TypeChannelDifference = await client.invoke(
                    new Api.updates.GetChannelDifference({
                        channel: inputChannel,
                        filter: new Api.ChannelMessagesFilterEmpty(),
                        pts: currentPts,
                        limit: 100,
                    })
                );

                if (diff instanceof Api.updates.ChannelDifferenceEmpty) {
                    if (diff.pts) {
                        client._channelPts.set(channelId, diff.pts);
                    }
                    fetching = false;
                } else if (diff instanceof Api.updates.ChannelDifference) {
                    const entities = new Map();
                    for (const user of diff.users) {
                        try { entities.set(utils.getPeerId(user), user); } catch (e) { /* skip */ }
                    }
                    for (const chat of diff.chats) {
                        try { entities.set(utils.getPeerId(chat), chat); } catch (e) { /* skip */ }
                    }

                    client._entityCache.add(diff);
                    client.session.processEntities(diff);

                    for (const message of diff.newMessages) {
                        if (message instanceof Api.Message || message instanceof Api.MessageService) {
                            const update = new Api.UpdateNewChannelMessage({
                                message: message,
                                pts: 0,
                                ptsCount: 0,
                            });
                            _dispatchSingleUpdate(client, update, null, entities);
                        }
                    }
                    for (const update of diff.otherUpdates) {
                        _dispatchSingleUpdate(client, update, diff.otherUpdates, entities);
                    }

                    client._channelPts.set(channelId, diff.pts);
                    fetching = !diff.final;
                } else if (diff instanceof Api.updates.ChannelDifferenceTooLong) {
                    client._log.warn(`Channel ${channelId} difference too long, some updates may be lost`);
                    if (diff.dialog && "pts" in diff.dialog) {
                        client._channelPts.set(channelId, (diff.dialog as any).pts);
                    }
                    fetching = false;
                }
            }

            client._log.debug(`Channel ${channelId} gap recovery round ${round + 1} complete`);
            _flushPendingChannelUpdates(client, channelId);

            // Check if pending buffer still has entries (= still gaps after flush)
            const stillPending = client._pendingChannelUpdates.get(channelId);
            if (!stillPending || stillPending.length === 0) {
                break; // No more gaps
            }

            client._log.debug(`Channel ${channelId} still has ${stillPending.length} pending updates, retrying...`);
        }
    } catch (e) {
        client._log.error(`Error recovering channel gap for ${channelId}: ${e}`);
        _flushPendingChannelUpdates(client, channelId);
    } finally {
        client._fetchingChannelDifference.delete(channelId);
    }
}


/** Try to apply buffered pts updates after gap recovery. Drops stale entries. */
function _flushPendingPtsUpdates(client: TelegramClient): void {
    if (!client._updateState) return;

    const now = Date.now();
    client._pendingPtsUpdates.sort((a, b) => a.pts - b.pts);

    const remaining: typeof client._pendingPtsUpdates = [];

    for (const pending of client._pendingPtsUpdates) {
        if (now - pending.bufferedAt > PENDING_UPDATE_TTL) {
            client._log.debug(`Dropping stale pending pts update (age=${now - pending.bufferedAt}ms)`);
            continue;
        }
        const result = _checkPts(client._updateState.pts, pending.pts, pending.ptsCount);
        if (result === "apply") {
            client._updateState.pts = pending.pts;
            _dispatchSingleUpdate(client, pending.update, pending.others, pending.entities);
        } else if (result === "duplicate") {
            // Skip
        } else {
            remaining.push(pending);
        }
    }

    client._pendingPtsUpdates = remaining;
}

/** Try to apply buffered seq updates after gap recovery. Drops stale entries. */
function _flushPendingSeqUpdates(client: TelegramClient): void {
    if (!client._updateState) return;

    const now = Date.now();
    client._pendingSeqUpdates.sort((a, b) => a.seqStart - b.seqStart);

    const remaining: typeof client._pendingSeqUpdates = [];

    for (const pending of client._pendingSeqUpdates) {
        if (now - pending.bufferedAt > PENDING_UPDATE_TTL) {
            client._log.debug(`Dropping stale pending seq update (age=${now - pending.bufferedAt}ms)`);
            continue;
        }
        const result = _checkSeq(client._updateState.seq, pending.seqStart);
        if (result === "apply") {
            client._updateState.seq = pending.seq;
            _handleUpdate(client, pending.update);
        } else if (result === "duplicate") {
            // Skip
        } else {
            remaining.push(pending);
        }
    }

    client._pendingSeqUpdates = remaining;
}

/** Try to apply buffered qts updates after gap recovery. Drops stale entries. */
function _flushPendingQtsUpdates(client: TelegramClient): void {
    if (!client._updateState) return;

    const now = Date.now();
    client._pendingQtsUpdates.sort((a, b) => a.qts - b.qts);

    const remaining: typeof client._pendingQtsUpdates = [];

    for (const pending of client._pendingQtsUpdates) {
        if (now - pending.bufferedAt > PENDING_UPDATE_TTL) {
            client._log.debug(`Dropping stale pending qts update (age=${now - pending.bufferedAt}ms)`);
            continue;
        }
        const localQts = client._updateState.qts;
        if (localQts + 1 === pending.qts) {
            client._updateState.qts = pending.qts;
            _dispatchSingleUpdate(client, pending.update, pending.others, pending.entities);
        } else if (localQts + 1 > pending.qts) {
            // duplicate
        } else {
            remaining.push(pending);
        }
    }

    client._pendingQtsUpdates = remaining;
}

/** Try to apply buffered channel updates after channel gap recovery. Drops stale entries. */
function _flushPendingChannelUpdates(client: TelegramClient, channelId: string): void {
    const pending = client._pendingChannelUpdates.get(channelId);
    if (!pending || pending.length === 0) {
        client._pendingChannelUpdates.delete(channelId);
        return;
    }

    const now = Date.now();
    const localPts = client._channelPts.get(channelId);

    pending.sort((a, b) => a.pts - b.pts);

    const remaining: typeof pending = [];

    for (const entry of pending) {
        if (now - entry.bufferedAt > PENDING_UPDATE_TTL) {
            client._log.debug(`Dropping stale pending channel update ch=${channelId} (age=${now - entry.bufferedAt}ms)`);
            continue;
        }
        if (localPts !== undefined) {
            const result = _checkPts(localPts, entry.pts, entry.ptsCount);
            if (result === "apply") {
                client._channelPts.set(channelId, entry.pts);
                _dispatchSingleUpdate(client, entry.update, entry.others, entry.entities);
            } else if (result === "gap") {
                remaining.push(entry);
            }
            // duplicate => skip
        } else {
            client._channelPts.set(channelId, entry.pts);
            _dispatchSingleUpdate(client, entry.update, entry.others, entry.entities);
        }
    }

    if (remaining.length > 0) {
        client._pendingChannelUpdates.set(channelId, remaining);
    } else {
        client._pendingChannelUpdates.delete(channelId);
    }
}

/** Force-flush all pending buffers (on error or overflow) */
function _forceFlushAllPending(client: TelegramClient): void {
    for (const pending of client._pendingPtsUpdates) {
        _dispatchSingleUpdate(client, pending.update, pending.others, pending.entities);
    }
    client._pendingPtsUpdates = [];

    for (const pending of client._pendingSeqUpdates) {
        _handleUpdate(client, pending.update);
    }
    client._pendingSeqUpdates = [];

    for (const pending of client._pendingQtsUpdates) {
        _dispatchSingleUpdate(client, pending.update, pending.others, pending.entities);
    }
    client._pendingQtsUpdates = [];

    for (const [, entries] of client._pendingChannelUpdates) {
        for (const entry of entries) {
            _dispatchSingleUpdate(client, entry.update, entry.others, entry.entities);
        }
    }
    client._pendingChannelUpdates.clear();
}

/** @hidden */
export function _handleUpdate(
    client: TelegramClient,
    update: Api.TypeUpdate | number
): void {
    try {
        if (typeof update === "number") {
            if ([-1, 0, 1].includes(update)) {
                _dispatchUpdate(client, {
                    update: new UpdateConnectionState(update),
                }).catch((e) => {
                    client._log.error(`Error dispatching connection state: ${e}`);
                });
                return;
            }
        }

        // Track last update time for the 15-minute no-updates timeout
        client._lastUpdateTime = Date.now();

        client._entityCache.add(update);
        client.session.processEntities(update);


        if (
            update instanceof Api.Updates ||
            update instanceof Api.UpdatesCombined
        ) {
            _handleUpdatesContainer(client, update);
        } else if (update instanceof Api.UpdateShort) {
            if (client._updateState) {
                client._updateState.date = update.date;
            }
            _processUpdate(client, update.update, null);
        } else if (update instanceof Api.UpdateShortMessage) {
            _handleShortMessagePts(client, update);
        } else if (update instanceof Api.UpdateShortChatMessage) {
            _handleShortMessagePts(client, update);
        } else if ((update as any).className === "UpdatesTooLong") {
            // Server says too many missed updates — run getDifference
            client._log.warn("Received UpdatesTooLong, recovering gap");
            _recoverCommonGap(client).catch((e) => {
                client._log.error(`Error during UpdatesTooLong recovery: ${e}`);
            });
        } else {
            _processUpdate(client, update, null);
        }
    } catch (e) {
        client._log.error(`Error handling update: ${e}`);
    }
}

/**
 * Handle Updates / UpdatesCombined containers with seq-based ordering.
 * @hidden
 */
function _handleUpdatesContainer(
    client: TelegramClient,
    update: Api.Updates | Api.UpdatesCombined
): void {
    if (client._updateState && update.seq !== 0) {
        const seqStart =
            "seqStart" in update
                ? (update as Api.UpdatesCombined).seqStart
                : update.seq;
        const localSeq = client._updateState.seq;
        const result = _checkSeq(localSeq, seqStart);

        if (result === "duplicate") {
            client._log.debug(
                `Skipping duplicate Updates container (seq: local=${localSeq}, seqStart=${seqStart})`
            );
            return;
        }

        if (result === "gap") {
            client._log.debug(
                `Seq gap detected (local=${localSeq}, seqStart=${seqStart}), buffering and recovering`
            );
            // Buffer this container and trigger gap recovery
            client._pendingSeqUpdates.push({
                update: update,
                seqStart: seqStart,
                seq: update.seq,
                bufferedAt: Date.now(),
            });
            _recoverCommonGap(client).catch((e) => {
                client._log.error(`Error recovering seq gap: ${e}`);
            });
            return;
        }

        // Apply: update seq and date
        client._updateState.seq = update.seq;
        client._updateState.date = update.date;
    }

    const entities = new Map();
    for (const x of [...update.users, ...update.chats]) {
        try {
            entities.set(utils.getPeerId(x), x);
        } catch (e) {
            // Skip invalid entity
        }
    }
    for (const u of update.updates) {
        _processUpdate(client, u, update.updates, entities);
    }
}

/**
 * Handle UpdateShortMessage / UpdateShortChatMessage (top-level with pts).
 * @hidden
 */
function _handleShortMessagePts(
    client: TelegramClient,
    update: Api.UpdateShortMessage | Api.UpdateShortChatMessage
): void {
    if (client._updateState) {
        const result = _checkPts(client._updateState.pts, update.pts, update.ptsCount);

        if (result === "duplicate") {
            client._log.debug(
                `Skipping duplicate ShortMessage (pts: local=${client._updateState.pts}+${update.ptsCount} > ${update.pts})`
            );
            return;
        }

        if (result === "gap") {
            client._log.debug(
                `Pts gap in ShortMessage (local=${client._updateState.pts}+${update.ptsCount} < ${update.pts}), buffering`
            );
            client._pendingPtsUpdates.push({
                update: update,
                pts: update.pts,
                ptsCount: update.ptsCount,
                others: null,
                bufferedAt: Date.now(),
            });
            _recoverCommonGap(client).catch((e) => {
                client._log.error(`Error recovering pts gap: ${e}`);
            });
            return;
        }

        client._updateState.pts = update.pts;
        client._updateState.date = update.date;
    }
    _dispatchSingleUpdate(client, update, null);
}


/** @hidden */
export function _processUpdate(
    client: TelegramClient,
    update: any,
    others: any,
    entities?: any
) {
    if (client._updateState) {
        if (_isCommonPtsUpdate(update)) {
            const result = _checkPts(client._updateState.pts, update.pts, update.ptsCount);

            if (result === "duplicate") {
                client._log.debug(
                    `Skipping duplicate update ${update.className} (pts: local=${client._updateState.pts}+${update.ptsCount} > ${update.pts})`
                );
                return;
            }

            if (result === "gap") {
                client._log.debug(
                    `Pts gap for ${update.className} (local=${client._updateState.pts}+${update.ptsCount} < ${update.pts}), buffering`
                );
                client._pendingPtsUpdates.push({
                    update, pts: update.pts, ptsCount: update.ptsCount, others, entities, bufferedAt: Date.now(),
                });
                _recoverCommonGap(client).catch((e) => {
                    client._log.error(`Error recovering pts gap: ${e}`);
                });
                return;
            }

            client._updateState.pts = update.pts;
        } else if (_isChannelPtsUpdate(update)) {
            const channelId = _getChannelId(update);
            if (channelId && update.pts && update.ptsCount) {
                const localPts = client._channelPts.get(channelId);

                if (localPts !== undefined) {
                    const result = _checkPts(localPts, update.pts, update.ptsCount);

                    if (result === "duplicate") {
                        client._log.debug(
                            `Skipping duplicate channel update ${update.className} (ch=${channelId} pts: local=${localPts}+${update.ptsCount} > ${update.pts})`
                        );
                        return;
                    }

                    if (result === "gap") {
                        client._log.debug(
                            `Channel pts gap for ${update.className} (ch=${channelId} local=${localPts}+${update.ptsCount} < ${update.pts}), buffering`
                        );
                        let channelPending = client._pendingChannelUpdates.get(channelId);
                        if (!channelPending) {
                            channelPending = [];
                            client._pendingChannelUpdates.set(channelId, channelPending);
                        }
                        channelPending.push({
                            update, pts: update.pts, ptsCount: update.ptsCount, others, entities, bufferedAt: Date.now(),
                        });
                        _recoverChannelGap(client, channelId).catch((e) => {
                            client._log.error(`Error recovering channel gap: ${e}`);
                        });
                        return;
                    }
                }

                client._channelPts.set(channelId, update.pts);

            }
        } else if (_hasQts(update)) {
            const localQts = client._updateState.qts;
            const qts = update.qts;

            if (localQts + 1 > qts) {
                client._log.debug(
                    `Skipping duplicate qts update (local=${localQts} >= ${qts})`
                );
                return;
            }

            if (localQts + 1 < qts) {
                // qts gap — buffer and recover
                client._log.debug(
                    `Qts gap (local=${localQts}, received=${qts}), buffering`
                );
                client._pendingQtsUpdates.push({ update, qts, others, entities, bufferedAt: Date.now() });
                _recoverCommonGap(client).catch((e) => {
                    client._log.error(`Error recovering qts gap: ${e}`);
                });
                return;
            }

            client._updateState.qts = qts;
        }
    }

    _dispatchSingleUpdate(client, update, others, entities);
}


/**
 * Dispatch a single update to event handlers (no dedup checks).
 * @hidden
 */
function _dispatchSingleUpdate(
    client: TelegramClient,
    update: any,
    others: any,
    entities?: any
) {
    update._entities = entities || new Map();
    const args = {
        update: update,
        others: others,
    };

    _dispatchUpdate(client, args).catch((e) => {
        client._log.error(`Error dispatching update: ${e}`);
    });
}

/** @hidden */
export async function _dispatchUpdate(
    client: TelegramClient,
    args: { update: UpdateConnectionState | any }
): Promise<void> {
    for (const [builder, callback] of client._eventBuilders) {
        if (!builder || !callback) {
            continue;
        }
        try {
            if (!builder.resolved) {
                await builder.resolve(client);
            }
        } catch (e) {
            client._log.error(`Error resolving event builder: ${e}`);
            continue;
        }
        let event = args.update;
        if (event) {
            if (!client._selfInputPeer) {
                try {
                    await client.getMe(true);
                } catch (e) {
                    // do nothing
                }
            }
            if (!(event instanceof UpdateConnectionState)) {
                // TODO fix me
            }
            // TODO fix others not being passed
            try {
                event = builder.build(
                    event,
                    callback,
                    client._selfInputPeer
                        ? returnBigInt(client._selfInputPeer.userId)
                        : undefined
                );
            } catch (e) {
                client._log.error(`Error building event: ${e}`);
                continue;
            }
            if (event) {
                event._client = client;

                if ("_eventName" in event) {
                    event._setClient(client);
                    event.originalUpdate = args.update;
                    event._entities = args.update._entities;
                }
                let filter;
                try {
                    filter = await builder.filter(event);
                } catch (e) {
                    client._log.error(`Error in event filter: ${e}`);
                    continue;
                }
                if (!filter) {
                    continue;
                }
                try {
                    await callback(event);
                } catch (e) {
                    if (e instanceof StopPropagation) {
                        break;
                    }
                    if (client._errorHandler) {
                        await client._errorHandler(e as Error);
                    }
                    client._log.error(`Error in event handler: ${e}`);
                }
            }
        }
    }
}


/** @hidden */
export async function _updateLoop(client: TelegramClient) {
    // Initialize update state early so pts/seq dedup works from the start
    if (!client._updateState) {
        try {
            const state = await client.invoke(new Api.updates.GetState());
            client._updateState = {
                pts: state.pts,
                qts: state.qts,
                date: state.date,
                seq: state.seq,
            };
            client._lastUpdateTime = Date.now();
            client._log.debug("Initialized update state for dedup");
        } catch (e) {
            // Ignore — user might not be logged in yet
        }
    }

    let lastPongAt;
    while (!client._destroyed) {
        await sleep(PING_INTERVAL, true);
        if (client._destroyed) break;
        // Check reconnecting state first - if reconnecting, skip this iteration
        // but don't exit the loop
        if (client._sender?.isReconnecting || client._isSwitchingDc) {
            lastPongAt = undefined;
            continue;
        }
        // Only exit if truly disconnected (not reconnecting)
        if (client.disconnected) break;

        try {
            const ping = () => {
                return client._sender!.send(
                    new Api.PingDelayDisconnect({
                        pingId: returnBigInt(
                            getRandomInt(
                                Number.MIN_SAFE_INTEGER,
                                Number.MAX_SAFE_INTEGER
                            )
                        ),
                        disconnectDelay: PING_DISCONNECT_DELAY,
                    })
                );
            };

            const pingAt = Date.now();
            const lastInterval = lastPongAt ? pingAt - lastPongAt : undefined;

            if (!lastInterval || lastInterval < PING_INTERVAL_TO_WAKE_UP) {
                await attempts(
                    () => timeout(ping, PING_TIMEOUT),
                    PING_FAIL_ATTEMPTS,
                    PING_FAIL_INTERVAL
                );
            } else {
                let wakeUpWarningTimeout: Timeout | undefined | number =
                    setTimeout(() => {
                        _handleUpdate(
                            client,
                            UpdateConnectionState.disconnected
                        );
                        wakeUpWarningTimeout = undefined;
                    }, PING_WAKE_UP_WARNING_TIMEOUT);

                await timeout(ping, PING_WAKE_UP_TIMEOUT);

                if (wakeUpWarningTimeout) {
                    clearTimeout(wakeUpWarningTimeout);
                    wakeUpWarningTimeout = undefined;
                }

                _handleUpdate(client, UpdateConnectionState.connected);
            }

            lastPongAt = Date.now();
        } catch (err) {
            if (client._errorHandler) {
                await client._errorHandler(err as Error);
            }
            client._log.error(`Ping failed: ${err}`);

            lastPongAt = undefined;

            if (client._destroyed) {
                break;
            }
            // Check reconnecting state first - if reconnecting, skip this iteration
            if (client._sender?.isReconnecting || client._isSwitchingDc) {
                continue;
            }
            // Only exit if truly disconnected (not reconnecting)
            if (client.disconnected) {
                break;
            }
            client._sender!.reconnect();
        }

        // Per Telegram docs: if no updates received for 15+ minutes, fetch difference
        if (
            client._updateState &&
            Date.now() - client._lastUpdateTime > NO_UPDATES_TIMEOUT
        ) {
            client._log.debug("No updates for 15 minutes, fetching difference");
            try {
                await _recoverCommonGap(client);
            } catch (e) {
                client._log.error(`Error fetching difference after no-updates timeout: ${e}`);
            }
            client._lastUpdateTime = Date.now();
        }

        // We need to send some content-related request at least hourly
        // for Telegram to keep delivering updates, otherwise they will
        // just stop even if we're connected. Do so every 30 minutes.
        if (Date.now() - (client._lastRequest || 0) > 30 * 60 * 1000) {
            try {
                const state = await client.invoke(new Api.updates.GetState());
                // Update our state to stay in sync
                if (client._updateState) {
                    client._updateState.pts = state.pts;
                    client._updateState.qts = state.qts;
                    client._updateState.date = state.date;
                    client._updateState.seq = state.seq;
                } else {
                    // Initialize update state if not yet set
                    client._updateState = {
                        pts: state.pts,
                        qts: state.qts,
                        date: state.date,
                        seq: state.seq,
                    };
                }
            } catch (e) {
                // Ignore auth errors - user might not be logged in yet
            }

            lastPongAt = undefined;
        }
    }
    // Mark loop as stopped so it can be restarted if needed
    client._loopStarted = false;
    // Only call disconnect if client was explicitly destroyed
    if (client._destroyed) {
        await client.disconnect();
    }
}

/** @hidden */
async function attempts(cb: CallableFunction, times: number, pause: number) {
    for (let i = 0; i < times; i++) {
        try {
            // We need to `return await` here so it can be caught locally
            return await cb();
        } catch (err: any) {
            if (i === times - 1) {
                throw err;
            }

            await sleep(pause);
        }
    }
    return undefined;
}

/** @hidden */
function timeout(cb: any, ms: any) {
    let isResolved = false;

    return Promise.race([
        cb(),
        sleep(ms).then(() =>
            isResolved ? undefined : Promise.reject(new Error("TIMEOUT"))
        ),
    ]).finally(() => {
        isResolved = true;
    });
}
