import { Api } from "../../tl";
import { returnBigInt } from "../../Helpers";
import type { TelegramClient } from "../TelegramClient";
import { ChannelScheduler, ChannelPollCancelledError } from "./ChannelScheduler";
import { PtsWaiter } from "./PtsWaiter";
import {
    channelIdOf,
    collectEntities,
    isMessage,
    nextRetryDelaySeconds,
    type DispatchPayload,
    type PtsUpdate,
} from "./updateKinds";

const DIFFERENCE_LIMIT_USER = 100;
const DIFFERENCE_LIMIT_BOT = 100_000;
const FLOOD_WAIT = /^FLOOD_(?:PREMIUM_)?WAIT(?:_|$)/;

export interface ChannelPollingState {
    pendingRequests: number;
    activeRequests: number;
    pausedUntil?: number;
    requestInterval?: number;
    channels: {
        channelId: string;
        lastPolledAt?: number;
        lastDelayMs?: number;
        nextPollAt?: number;
    }[];
}

export interface ChannelUpdatesHost {
    readonly client: TelegramClient;
    readonly generation: number;
    isCurrent(generation: number): boolean;
    dispatch(update: Api.TypeUpdate, payload: DispatchPayload): void;
    saveEntities(tlo: unknown): Promise<void>;
    saveState(): void;
    requestDifference(): void;
}

interface ChannelTracker {
    pts: PtsWaiter;
    initializing?: Promise<void>;
    difference?: Promise<void>;
    gapTimer?: NodeJS.Timeout;
    pollTimer?: NodeJS.Timeout;
    retryTimer?: NodeJS.Timeout;
    retryDelayS: number;
    inputChannel?: Api.TypeInputChannel;
    lastPolledAt?: number;
    lastDelayMs?: number;
    nextPollAt?: number;
}

export class ChannelUpdates {
    private readonly trackers = new Map<string, ChannelTracker>();
    private readonly stored = new Map<string, number>();
    private readonly watched = new Map<string, number>();
    private readonly scheduler: ChannelScheduler;
    private readonly requests = new WeakSet<object>();

    constructor(private readonly host: ChannelUpdatesHost) {
        this.scheduler = new ChannelScheduler(host.client._channelPollRequestInterval, host.client._channelPollConcurrency);
    }

    private get client() {
        return this.host.client;
    }

    start() {
        this.scheduler.start();
    }

    stop() {
        this.scheduler.stop();
        for (const tracker of this.trackers.values()) {
            clearTimeout(tracker.gapTimer);
            clearTimeout(tracker.pollTimer);
            clearTimeout(tracker.retryTimer);
            tracker.gapTimer = tracker.pollTimer = tracker.retryTimer = undefined;
            tracker.initializing = tracker.difference = tracker.nextPollAt = undefined;
            tracker.retryDelayS = 0;
            tracker.pts.clearSkippedUpdates();
            tracker.pts.setRequesting(false);
        }
        if (this.client._destroyed) this.trackers.clear();
        this.watched.clear();
    }

    reset() {
        this.trackers.clear();
        this.stored.clear();
    }

    restore(channels: Record<string, number> | undefined) {
        for (const [channelId, pts] of Object.entries(channels ?? {})) this.stored.set(channelId, pts);
    }

    snapshot(): Record<string, number> {
        const channels: Record<string, number> = Object.fromEntries(this.stored);
        for (const [channelId, tracker] of this.trackers) {
            if (tracker.pts.inited()) channels[channelId] = tracker.pts.current();
        }
        return channels;
    }

    feed(update: PtsUpdate, payload: DispatchPayload) {
        const channelId = channelIdOf(update);
        if (!channelId || !update.pts) {
            this.host.dispatch(update, payload);
            return;
        }
        const tracker = this.tracker(channelId);
        if (!tracker.pts.inited()) {
            const stored = this.stored.get(channelId);
            if (stored === undefined) {
                tracker.pts.init(update.pts);
                this.host.saveState();
                this.host.dispatch(update, payload);
                return;
            }
            tracker.pts.init(stored);
        }
        tracker.pts.updateAndApply(
            update.pts,
            update.ptsCount,
            { tag: "update", update },
            (applied) => {
                this.host.saveState();
                this.host.dispatch(applied, payload);
            },
            () => {}
        );
    }

    applyAffected(channelId: string, pts: number, ptsCount: number) {
        const tracker = this.tracker(channelId);
        if (!tracker.pts.inited()) {
            tracker.pts.init(pts);
            this.host.saveState();
            return;
        }
        tracker.pts.updateAndApply(pts, ptsCount, { tag: "update" }, () => this.host.saveState(), () => {});
    }

    tooLong(update: Api.UpdateChannelTooLong, fromDifference: boolean) {
        const channelId = update.channelId.toString();
        const existing = this.trackers.get(channelId);
        const known = existing?.pts.inited() ? existing.pts.current() : this.stored.get(channelId);
        if (known !== undefined) {
            if (update.pts && update.pts <= known) return;
            const tracker = this.tracker(channelId);
            if (!tracker.pts.inited()) tracker.pts.init(known);
            void this.fetchDifference(channelId);
            return;
        }
        if (!fromDifference) {
            this.host.requestDifference();
            return;
        }
        this.tracker(channelId).pts.init(1);
        void this.fetchDifference(channelId);
    }

    async watch(channelId: string, inputChannel: Api.TypeInputChannel, signal?: AbortSignal): Promise<void> {
        if (signal?.aborted) return;
        const generation = this.host.generation;
        if (!this.host.isCurrent(generation)) throw new Error("Update manager is stopped");
        const watching = this.watched.get(channelId) ?? 0;
        this.watched.set(channelId, watching + 1);
        const tracker = this.tracker(channelId);
        tracker.inputChannel = inputChannel;
        let released = false;
        const release = () => {
            if (released) return;
            released = true;
            if (this.host.isCurrent(generation) && this.trackers.get(channelId) === tracker) this.release(channelId);
        };
        if (!tracker.initializing && (watching === 0 || !tracker.pts.inited())) {
            const task = (async () => {
                if (!tracker.pts.inited()) {
                    const pts = await this.readPts(channelId, inputChannel);
                    if (!this.host.isCurrent(generation) || !this.watched.has(channelId) || this.trackers.get(channelId) !== tracker) return;
                    if (!tracker.pts.inited()) tracker.pts.init(pts);
                }
                await this.fetchDifference(channelId);
            })();
            tracker.initializing = task;
            void task
                .finally(() => {
                    if (tracker.initializing === task) tracker.initializing = undefined;
                })
                .catch(() => {});
        }
        const task = tracker.initializing ?? Promise.resolve();
        if (!signal) {
            await task.catch((error) => {
                release();
                throw error;
            });
            return;
        }
        await new Promise<void>((resolve, reject) => {
            const onAbort = () => {
                release();
                resolve();
            };
            signal.addEventListener("abort", onAbort, { once: true });
            task.then(resolve, (error) => {
                signal.removeEventListener("abort", onAbort);
                release();
                reject(error);
            });
        });
    }

    release(channelId: string) {
        const watching = this.watched.get(channelId);
        if (!watching) return;
        if (watching > 1) {
            this.watched.set(channelId, watching - 1);
            return;
        }
        this.watched.delete(channelId);
        this.scheduler.cancel(channelId);
        const tracker = this.trackers.get(channelId);
        if (!tracker) return;
        clearTimeout(tracker.pollTimer);
        tracker.pollTimer = tracker.nextPollAt = undefined;
    }

    watchedIds(): string[] {
        return [...this.watched.keys()];
    }

    get polling(): ChannelPollingState {
        return {
            ...this.scheduler.state,
            channels: this.watchedIds().map((channelId) => {
                const tracker = this.trackers.get(channelId);
                return {
                    channelId,
                    lastPolledAt: tracker?.lastPolledAt,
                    lastDelayMs: tracker?.lastDelayMs,
                    nextPollAt: tracker?.nextPollAt,
                };
            }),
        };
    }

    handleFloodWait(request: object, seconds: number): boolean {
        if (!this.requests.has(request)) return false;
        if (Number.isFinite(seconds) && seconds > 0) this.scheduler.pause(seconds * 1000);
        return true;
    }

    private tracker(channelId: string): ChannelTracker {
        let tracker = this.trackers.get(channelId);
        if (tracker) return tracker;
        const created: ChannelTracker = {
            retryDelayS: 0,
            pts: new PtsWaiter({
                onWaitForSkipped: (ms) => {
                    clearTimeout(created.gapTimer);
                    created.gapTimer = undefined;
                    if (ms < 0) return;
                    created.gapTimer = setTimeout(() => {
                        created.gapTimer = undefined;
                        void this.fetchDifference(channelId);
                    }, Math.min(ms, 1));
                },
            }),
        };
        this.trackers.set(channelId, created);
        return created;
    }

    private invoke<R extends Api.AnyRequest>(channelId: string, create: () => R): Promise<R["__response"]> {
        const generation = this.host.generation;
        return this.schedule(channelId, create, generation).catch((error) => {
            if (!FLOOD_WAIT.test((error as { errorMessage?: string })?.errorMessage ?? "") || !this.host.isCurrent(generation)) throw error;
            return this.invoke(channelId, create);
        });
    }

    private schedule<R extends Api.AnyRequest>(channelId: string, create: () => R, generation: number): Promise<R["__response"]> {
        const queuedAt = Date.now();
        return this.scheduler.schedule(channelId, async () => {
            if (!this.host.isCurrent(generation)) throw new ChannelPollCancelledError();
            if (this.client.updates.authorizationError) throw this.client.updates.authorizationError;
            const request = create();
            this.requests.add(request);
            const tracker = this.trackers.get(channelId);
            if (tracker && request instanceof Api.updates.GetChannelDifference) {
                tracker.pts.setRequesting(true);
                tracker.lastPolledAt = Date.now();
                tracker.lastDelayMs = tracker.lastPolledAt - queuedAt;
            }
            try {
                return await this.client.invoke(request);
            } catch (error) {
                if (this.host.isCurrent(generation)) {
                    this.client.updates._suspendAuthorization(error);
                    const flood = error as { errorMessage?: string; seconds?: number };
                    if (FLOOD_WAIT.test(flood.errorMessage ?? "")) this.handleFloodWait(request, flood.seconds ?? 0);
                }
                throw error;
            } finally {
                this.requests.delete(request);
            }
        });
    }

    private async readPts(channelId: string, inputChannel: Api.TypeInputChannel): Promise<number> {
        const stored = this.stored.get(channelId);
        if (stored) return stored;
        const full = await this.invoke(channelId, () => new Api.channels.GetFullChannel({ channel: inputChannel }));
        this.client._entityCache.add(full);
        if (!(full.fullChat instanceof Api.ChannelFull)) throw new Error("Cannot read the channel pts to start watching it");
        return full.fullChat.pts;
    }

    private fetchDifference(channelId: string): Promise<void> {
        const tracker = this.trackers.get(channelId);
        if (!tracker) return Promise.resolve();
        if (tracker.difference) return tracker.difference;
        const task = this.fetchDifferenceOnce(channelId, tracker);
        tracker.difference = task;
        void task
            .finally(() => {
                if (tracker.difference === task) tracker.difference = undefined;
            })
            .catch(() => {});
        return task;
    }

    private async fetchDifferenceOnce(channelId: string, tracker: ChannelTracker): Promise<void> {
        const generation = this.host.generation;
        if (!this.host.isCurrent(generation) || this.client.updates.authorizationError) return;
        if (tracker.pts.requesting() || !tracker.pts.inited()) return;
        const current = () => this.host.isCurrent(generation) && this.trackers.get(channelId) === tracker;
        clearTimeout(tracker.pollTimer);
        clearTimeout(tracker.retryTimer);
        tracker.pollTimer = tracker.retryTimer = tracker.nextPollAt = undefined;
        let failed = false;
        let serverTimeoutS: number | undefined;
        try {
            const inputChannel = await this.resolve(channelId, tracker);
            if (!current()) return;
            if (!inputChannel) {
                this.client._log.warn(`Cannot resolve channel ${channelId}, skipping its difference`);
                return;
            }
            tracker.inputChannel = inputChannel;
            for (;;) {
                const requestPts = tracker.pts.current();
                const limit = requestPts > 0 ? (this.client._bot ? DIFFERENCE_LIMIT_BOT : DIFFERENCE_LIMIT_USER) : 1;
                const diff = await this.invoke(
                    channelId,
                    () =>
                        new Api.updates.GetChannelDifference({
                            channel: inputChannel,
                            filter: new Api.ChannelMessagesFilterEmpty(),
                            pts: Math.max(requestPts, 1),
                            limit,
                            force: true,
                        })
                );
                if (!current()) return;
                serverTimeoutS = diff.timeout;
                await this.applyDifference(channelId, tracker, requestPts, diff);
                if (!current()) return;
                this.host.saveState();
                if (diff.final) break;
            }
            tracker.retryDelayS = 0;
        } catch (error) {
            if (!current() || error instanceof ChannelPollCancelledError) return;
            if (this.client.updates._suspendAuthorization(error)) return;
            const message = (error as { errorMessage?: string })?.errorMessage;
            if (message === "CHANNEL_PRIVATE" || message === "CHANNEL_INVALID") {
                this.client._log.info(`Channel ${channelId} is inaccessible (${message}), dropping it`);
                this.drop(channelId);
                return;
            }
            failed = true;
            this.client._log.warn(`updates.getChannelDifference for ${channelId} failed: ${error}`);
        } finally {
            if (current()) tracker.pts.setRequesting(false);
        }
        if (!current()) return;
        if (failed) this.scheduleRetry(channelId, tracker);
        else this.schedulePoll(channelId, tracker, serverTimeoutS);
    }

    private async applyDifference(
        channelId: string,
        tracker: ChannelTracker,
        requestPts: number,
        diff: Api.updates.TypeChannelDifference
    ) {
        if (diff instanceof Api.updates.ChannelDifferenceEmpty) {
            tracker.pts.init(Math.max(diff.pts, requestPts), true);
            return;
        }
        this.client._entityCache.add(diff);
        await this.host.saveEntities(diff);
        if (diff instanceof Api.updates.ChannelDifference) {
            const entities = collectEntities(diff.users, diff.chats);
            for (const message of diff.newMessages.filter(isMessage).sort((a, b) => a.id - b.id)) {
                this.host.dispatch(new Api.UpdateNewChannelMessage({ message, pts: 0, ptsCount: 0 }), { others: null, entities });
            }
            for (const update of diff.otherUpdates) this.host.dispatch(update, { others: diff.otherUpdates, entities });
            tracker.pts.init(diff.pts > requestPts ? diff.pts : requestPts + 1, true);
            return;
        }
        const dialogPts = diff.dialog instanceof Api.Dialog ? diff.dialog.pts : undefined;
        const next = dialogPts !== undefined && dialogPts > requestPts ? dialogPts : requestPts + 1;
        this.client._log.warn(`Channel ${channelId} difference is too long, skipping to pts ${next}`);
        tracker.pts.init(next, true);
    }

    private scheduleRetry(channelId: string, tracker: ChannelTracker) {
        tracker.retryDelayS = nextRetryDelaySeconds(tracker.retryDelayS);
        const delayMs = Math.max(
            tracker.retryDelayS * 1000 * (0.8 + Math.random() * 0.4),
            (this.scheduler.state.pausedUntil ?? 0) - Date.now()
        );
        tracker.nextPollAt = Date.now() + delayMs;
        tracker.retryTimer = setTimeout(() => {
            tracker.retryTimer = undefined;
            void this.fetchDifference(channelId);
        }, delayMs);
    }

    private schedulePoll(channelId: string, tracker: ChannelTracker, serverTimeoutS?: number) {
        if (!this.watched.has(channelId)) return;
        clearTimeout(tracker.pollTimer);
        const delayMs = serverTimeoutS && serverTimeoutS > 0 ? serverTimeoutS * 1000 : this.client._channelPollInterval;
        tracker.nextPollAt = Date.now() + delayMs;
        tracker.pollTimer = setTimeout(() => {
            tracker.pollTimer = undefined;
            void this.fetchDifference(channelId);
        }, delayMs);
    }

    private async resolve(channelId: string, tracker: ChannelTracker): Promise<Api.TypeInputChannel | undefined> {
        if (tracker.inputChannel) return tracker.inputChannel;
        try {
            const input = await this.client.getInputEntity(new Api.PeerChannel({ channelId: returnBigInt(channelId) }));
            if (input instanceof Api.InputPeerChannel) {
                return new Api.InputChannel({ channelId: input.channelId, accessHash: input.accessHash });
            }
        } catch {}
        return undefined;
    }

    private drop(channelId: string) {
        this.watched.delete(channelId);
        this.scheduler.cancel(channelId);
        this.stored.delete(channelId);
        const tracker = this.trackers.get(channelId);
        if (!tracker) return;
        clearTimeout(tracker.gapTimer);
        clearTimeout(tracker.pollTimer);
        clearTimeout(tracker.retryTimer);
        tracker.pts.clearSkippedUpdates();
        this.trackers.delete(channelId);
        this.host.saveState();
    }
}
