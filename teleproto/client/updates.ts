import type { EventBuilder } from "../events/common";
import { Api } from "../tl";
import type { TelegramClient } from "..";
import { UpdateConnectionState } from "../network";
import type { Raw } from "../events";
import { utils } from "../index";
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
            _processUpdate(client, update, null, entities);
        }
    }

    // Process other updates
    for (const update of diff.otherUpdates) {
        _processUpdate(client, update, diff.otherUpdates, entities);
    }
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

        client._entityCache.add(update);
        client.session.processEntities(update);

        if (
            update instanceof Api.Updates ||
            update instanceof Api.UpdatesCombined
        ) {
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
        } else if (update instanceof Api.UpdateShort) {
            _processUpdate(client, update.update, null);
        } else {
            _processUpdate(client, update, null);
        }
    } catch (e) {
        client._log.error(`Error handling update: ${e}`);
    }
}

/** @hidden */
export function _processUpdate(
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
    // Initialize update state on first run
    if (!client._updateState) {
        try {
            const state = await client.invoke(new Api.updates.GetState());
            client._updateState = {
                pts: state.pts,
                qts: state.qts,
                date: state.date,
                seq: state.seq,
            };
            client._log.debug("Initialized update state");
        } catch (e) {
            client._log.error(`Failed to get initial update state: ${e}`);
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
                }
            } catch (e) {
                // we don't care about errors here
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
