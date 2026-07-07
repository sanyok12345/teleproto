import type { EventBuilder } from "../events/common";
import { Api } from "../tl";
import type { TelegramClient } from "./TelegramClient";
import { UpdateConnectionState } from "../network";
import type { Raw } from "../events";
import { getRandomInt, returnBigInt, sleep } from "../Helpers";
import Timeout = NodeJS.Timeout;

const PING_INTERVAL = 9000; // 9 sec
const PING_TIMEOUT = 10000; // 10 sec
const PING_FAIL_ATTEMPTS = 3;
const PING_FAIL_INTERVAL = 100; // ms
const PING_DISCONNECT_DELAY = 60000; // 1 min
const PING_INTERVAL_TO_WAKE_UP = 5000;
const PING_WAKE_UP_TIMEOUT = 3000;
const PING_WAKE_UP_WARNING_TIMEOUT = 1000;

/**
 * If raised inside a registered handler, stops further dispatching for that
 * update — analogue of StopIteration but for events.
 */
export class StopPropagation extends Error {}

export function on(client: TelegramClient, event?: EventBuilder) {
    return (f: (event: any) => void) => {
        client.addEventHandler(f, event);
        return f;
    };
}

export function addEventHandler(
    client: TelegramClient,
    callback: CallableFunction,
    event?: EventBuilder,
) {
    if (event == undefined) {
        const raw = require("../events/Raw").Raw;
        event = new raw({}) as Raw;
    }
    event.client = client;
    client._eventBuilders.push([event, callback]);
}

export function removeEventHandler(
    client: TelegramClient,
    callback: CallableFunction,
    event: EventBuilder,
) {
    client._eventBuilders = client._eventBuilders.filter(
        (item) => item[0] !== event && item[1] !== callback,
    );
}

export function listEventHandlers(client: TelegramClient) {
    return client._eventBuilders;
}

export async function catchUp(client: TelegramClient): Promise<void> {
    await client.updateManager.catchUp();
}

/** @hidden */
export function _handleUpdate(
    client: TelegramClient,
    update: Api.TypeUpdate | Api.TypeUpdates | number,
): void {
    try {
        if (typeof update === "number") {
            if ([-1, 0, 1].includes(update)) {
                _dispatchUpdate(client, {
                    update: new UpdateConnectionState(update),
                }).catch((e) => {
                    client._log.error(`Error dispatching connection state: ${e}`);
                });
            }
            return;
        }
        client.updateManager.onUpdates(update);
    } catch (e) {
        client._log.error(`Error handling update: ${e}`);
    }
}

/** @hidden */
export async function _dispatchUpdate(
    client: TelegramClient,
    args: { update: UpdateConnectionState | any },
): Promise<void> {
    for (const [builder, callback] of [...client._eventBuilders]) {
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
                } catch {
                    // ignore — user may not be authorized yet
                }
            }
            try {
                event = builder.build(
                    event,
                    callback,
                    client._selfInputPeer
                        ? returnBigInt(client._selfInputPeer.userId)
                        : undefined,
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
                if (!filter) continue;
                try {
                    await callback(event);
                } catch (e) {
                    if (e instanceof StopPropagation) break;
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
    client.updateManager.start();
    await client.updateManager.ensureState();

    let lastPongAt: number | undefined;
    while (!client._destroyed) {
        await sleep(PING_INTERVAL, true);
        if (client._destroyed) break;
        if (client._sender?.isReconnecting || client._isSwitchingDc) {
            lastPongAt = undefined;
            continue;
        }
        if (client.disconnected) break;

        try {
            const ping = () =>
                client._sender!.send(
                    new Api.PingDelayDisconnect({
                        pingId: returnBigInt(
                            getRandomInt(
                                Number.MIN_SAFE_INTEGER,
                                Number.MAX_SAFE_INTEGER,
                            ),
                        ),
                        disconnectDelay: PING_DISCONNECT_DELAY,
                    }),
                );

            const pingAt = Date.now();
            const lastInterval = lastPongAt ? pingAt - lastPongAt : undefined;

            if (!lastInterval || lastInterval < PING_INTERVAL_TO_WAKE_UP) {
                await attempts(
                    () => timeout(ping, PING_TIMEOUT),
                    PING_FAIL_ATTEMPTS,
                    PING_FAIL_INTERVAL,
                );
            } else {
                let wakeUpWarningTimeout: Timeout | undefined =
                    setTimeout(() => {
                        _handleUpdate(client, UpdateConnectionState.disconnected);
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

            if (client._destroyed) break;
            if (client._sender?.isReconnecting || client._isSwitchingDc) continue;
            if (client.disconnected) break;
            client._sender!.reconnect();
        }

        await client.updateManager.recoverIfStale();

        // Per Telegram docs, we need a content-related request at least hourly
        // for Telegram to keep delivering updates. Refresh state every 30 minutes.
        if (Date.now() - (client._lastRequest || 0) > 30 * 60 * 1000) {
            try {
                const state = await client.api.updates.getState();
                client.updateManager.refreshFromState(state);
            } catch {
                // ignore — user may not be authorized yet
            }
            lastPongAt = undefined;
        }
    }

    client._loopStarted = false;
    if (client._destroyed) {
        await client.disconnect();
    }
}

async function attempts(cb: CallableFunction, times: number, pause: number) {
    for (let i = 0; i < times; i++) {
        try {
            return await cb();
        } catch (err) {
            if (i === times - 1) throw err;
            await sleep(pause);
        }
    }
    return undefined;
}

function timeout(cb: () => Promise<unknown> | undefined, ms: number) {
    let resolved = false;
    return Promise.race([
        cb(),
        sleep(ms).then(() =>
            resolved ? undefined : Promise.reject(new Error("TIMEOUT")),
        ),
    ]).finally(() => {
        resolved = true;
    });
}
