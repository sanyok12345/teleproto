import type { Api } from "../tl";
import type { TelegramClient } from "./TelegramClient";
import { PtsWaiter, type PtsWaiterHost } from "./PtsWaiter";

const NO_UPDATES_TIMEOUT_MS = 60_000;
const FAIL_DIFFERENCE_TIMEOUT_INITIAL_S = 1;
const FAIL_DIFFERENCE_TIMEOUT_CAP_S = 64;
const CHANNEL_DIFFERENCE_LIMIT = 100;
const SHORT_POLL_TIMEOUT_MS = 1000;

type ChannelId = string;

export type ChannelDiffRequestKind = "unknown" | "ptsGapOrShortPoll" | "afterFail";

export class UpdateManager {
    private readonly client: TelegramClient;

    private date = 0;
    private qts = -1;
    private seq = 0;

    private readonly globalPts: PtsWaiter;

    private readonly bySeqUpdates = new Map<number, Api.TypeUpdates>();

    private readonly whenGetDiffByPts = new Map<ChannelId, number>();
    private readonly whenGetDiffAfterFail = new Map<ChannelId, number>();
    private getDifferenceTimeByPts = 0;
    private getDifferenceTimeAfterFail = 0;

    private failDifferenceTimeout = FAIL_DIFFERENCE_TIMEOUT_INITIAL_S;
    private readonly channelFailDifferenceTimeout = new Map<ChannelId, number>();

    private readonly rangeDifferenceRequests = new Map<ChannelId, AbortController>();

    private noUpdatesTimer?: NodeJS.Timeout;
    private byPtsTimer?: NodeJS.Timeout;
    private bySeqTimer?: NodeJS.Timeout;
    private byMinChannelTimer?: NodeJS.Timeout;
    private failDifferenceTimer?: NodeJS.Timeout;

    private handlingChannelDifference = false;
    private lastUpdateTime = 0;
    private running = false;

    constructor(client: TelegramClient) {
        this.client = client;
        const host: PtsWaiterHost = {
            onWaitForSkipped: () => {},
            onWaitForShortPoll: () => {},
        };
        this.globalPts = new PtsWaiter(host);
    }

    start(): void {
        if (this.running) return;
        this.running = true;
        this.armNoUpdatesTimer();
    }

    stop(): void {
        if (!this.running) return;
        this.running = false;
        this.clearAllTimers();
        this.bySeqUpdates.clear();
        this.whenGetDiffByPts.clear();
        this.whenGetDiffAfterFail.clear();
        this.channelFailDifferenceTimeout.clear();
        for (const ctrl of this.rangeDifferenceRequests.values()) ctrl.abort();
        this.rangeDifferenceRequests.clear();
        this.globalPts.clearSkippedUpdates();
    }

    onUpdates(_updates: Api.TypeUpdates): void {}

    catchUp(): Promise<void> {
        return Promise.resolve();
    }

    private armNoUpdatesTimer(): void {
        if (this.noUpdatesTimer) clearTimeout(this.noUpdatesTimer);
        this.noUpdatesTimer = setTimeout(() => {}, NO_UPDATES_TIMEOUT_MS);
    }

    private clearAllTimers(): void {
        for (const t of [
            this.noUpdatesTimer,
            this.byPtsTimer,
            this.bySeqTimer,
            this.byMinChannelTimer,
            this.failDifferenceTimer,
        ]) {
            if (t) clearTimeout(t);
        }
        this.noUpdatesTimer = undefined;
        this.byPtsTimer = undefined;
        this.bySeqTimer = undefined;
        this.byMinChannelTimer = undefined;
        this.failDifferenceTimer = undefined;
    }
}

export const UPDATE_MANAGER_CONSTANTS = {
    NO_UPDATES_TIMEOUT_MS,
    FAIL_DIFFERENCE_TIMEOUT_INITIAL_S,
    FAIL_DIFFERENCE_TIMEOUT_CAP_S,
    CHANNEL_DIFFERENCE_LIMIT,
    SHORT_POLL_TIMEOUT_MS,
} as const;
