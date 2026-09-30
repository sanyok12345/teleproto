import type { EventBuilder } from "../../events/common";
import { Api } from "../../tl";
import type { TelegramClient } from "../TelegramClient";
import { UpdateConnectionState } from "../../network";
import type { Raw } from "../../events";
import { getRandomInt, returnBigInt, sleep } from "../../Helpers";
import Timeout = NodeJS.Timeout;
import { setTimeout as delay } from "node:timers/promises";

const PING_INTERVAL = 9000; // 9 sec
const PING_TIMEOUT = 10000; // 10 sec
const PING_FAIL_ATTEMPTS = 3;
const PING_FAIL_INTERVAL = 100; // ms
const PING_DISCONNECT_DELAY = 75;
const PING_INTERVAL_TO_WAKE_UP = 5000;
const PING_WAKE_UP_TIMEOUT = 3000;
const PING_WAKE_UP_WARNING_TIMEOUT = 1000;

export class StopPropagation extends Error { }

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
        const raw = require("../../events/Raw").Raw;
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

export function _handleUpdate(
    client: TelegramClient,
    update:
        | Api.TypeUpdate
        | Api.TypeUpdates
        | UpdateConnectionState
        | number,
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
        if (update instanceof UpdateConnectionState) {
            _dispatchUpdate(client, { update }).catch((e) => {
                client._log.error(`Error dispatching connection state: ${e}`);
            });
            return;
        }
        client.updateManager.onUpdates(update);
    } catch (e) {
        client._log.error(`Error handling update: ${e}`);
    }
}

interface DispatchJob {
    args: { update: UpdateConnectionState | any };
    resolve: () => void;
    reject: (error: unknown) => void;
    next?: DispatchJob;
}

interface DispatchQueue {
    head?: DispatchJob;
    tail?: DispatchJob;
}

const dispatchQueues = new WeakMap<TelegramClient, DispatchQueue>();

/** Releases pending deliveries; an already running handler may finish. @hidden */
export function _clearUpdateQueue(client: TelegramClient): void {
    const queue = dispatchQueues.get(client);
    if (!queue) return;
    while (queue.head) {
        const job = queue.head;
        queue.head = job.next;
        job.next = undefined;
        job.resolve();
    }
    queue.tail = undefined;
}

async function drainUpdates(client: TelegramClient, queue: DispatchQueue): Promise<void> {
    while (queue.head) {
        const job = queue.head;
        queue.head = job.next;
        job.next = undefined;
        if (!queue.head) queue.tail = undefined;
        try {
            if (!client._destroyed) await dispatchUpdate(client, job.args);
            job.resolve();
        } catch (error) {
            job.reject(error);
        }
    }
    dispatchQueues.delete(client);
}

export function _dispatchUpdate(
    client: TelegramClient,
    args: { update: UpdateConnectionState | any },
): Promise<void> {
    if (client._destroyed) return Promise.resolve();
    if (!client._sequentialUpdates) return dispatchUpdate(client, args);
    return new Promise<void>((resolve, reject) => {
        const job: DispatchJob = { args, resolve, reject };
        const queue = dispatchQueues.get(client);
        if (queue) {
            if (queue.tail) queue.tail.next = job;
            else queue.head = job;
            queue.tail = job;
        } else {
            const queue = { head: job, tail: job };
            dispatchQueues.set(client, queue);
            void drainUpdates(client, queue);
        }
    });
}

async function dispatchUpdate(
    client: TelegramClient,
    args: { update: UpdateConnectionState | any },
): Promise<void> {
    for (const [builder, callback] of [...client._eventBuilders]) {
        if (client._destroyed) return;
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
                    event.originalUpdate = args.update;
                    event._entities = args.update._entities ?? new Map();
                    event._setClient(client);
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
                        try {
                            await client._errorHandler(e as Error);
                        } catch (error) {
                            client._log.error(`Error in update error handler: ${error}`);
                        }
                    }
                    client._log.error(`Error in event handler: ${e}`);
                }
            }
        }
    }
    if (!client._destroyed) await client.updates._dispatch(args.update);
}

const updateLoops = new WeakMap<TelegramClient, AbortController>();

/** @hidden */
export function _stopUpdateLoop(client: TelegramClient): void {
    updateLoops.get(client)?.abort();
    updateLoops.delete(client);
    client._loopStarted = false;
}

export async function _updateLoop(client: TelegramClient, catchUp = true) {
    updateLoops.get(client)?.abort();
    const controller = new AbortController();
    updateLoops.set(client, controller);
    const active = () => !controller.signal.aborted && !client._destroyed;
    client.updateManager.start();
    if (catchUp) await client.updateManager.catchUp();

    let lastPongAt: number | undefined;
    while (active()) {
        try {
            await delay(PING_INTERVAL, undefined, { signal: controller.signal, ref: false });
        } catch {
            break;
        }
        if (!active()) break;
        if (client._sender?.isReconnecting || client._isSwitchingDc) {
            lastPongAt = undefined;
            continue;
        }
        if (client.disconnected) break;

        try {
            const ping = () => {
                if (!active()) throw new Error("Update loop stopped");
                return client._sender!.send(
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
            };

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
                        if (active()) _handleUpdate(client, UpdateConnectionState.disconnected);
                        wakeUpWarningTimeout = undefined;
                    }, PING_WAKE_UP_WARNING_TIMEOUT);

                try {
                    await timeout(ping, PING_WAKE_UP_TIMEOUT);
                } finally {
                    if (wakeUpWarningTimeout) clearTimeout(wakeUpWarningTimeout);
                }
                if (active()) _handleUpdate(client, UpdateConnectionState.connected);
            }

            lastPongAt = Date.now();
        } catch (err) {
            lastPongAt = undefined;
            if (!active()) break;

            if (Date.now() - client._lastReceivedAt < PING_INTERVAL + PING_TIMEOUT) {
                client._log.debug(`Ping timed out but transfer is active, ignoring`);
                continue;
            }

            if (client._errorHandler) {
                await client._errorHandler(err as Error);
            }
            if (!active()) break;
            client._log.warn(`Ping failed: ${err}, reconnecting`);

            if (client._sender?.isReconnecting || client._isSwitchingDc) continue;
            if (client.disconnected) break;
            client._sender!.reconnect();
        }

        if (!active()) break;
        await client.updateManager.recoverIfStale();
        if (!active()) break;

        if (Date.now() - (client._lastRequest || 0) > 30 * 60 * 1000) {
            try {
                await client.updateManager.catchUp();
            } catch {
            }
            lastPongAt = undefined;
        }
    }

    if (updateLoops.get(client) === controller) {
        _stopUpdateLoop(client);
        if (client._destroyed) await client.disconnect();
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
