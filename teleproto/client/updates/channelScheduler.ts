interface Job {
    channelId: string;
    run: () => Promise<unknown>;
    resolve: (value: any) => void;
    reject: (error: unknown) => void;
}

export class ChannelPollCancelledError extends Error {
    constructor() {
        super("Channel polling cancelled");
        this.name = "AbortError";
    }
}

export class ChannelScheduler {
    private readonly queue: Job[] = [];
    private readonly active = new Set<Job>();
    private timer?: ReturnType<typeof setTimeout>;
    private running = false;
    private nextStartAt = 0;
    private pausedUntil = 0;

    constructor(
        private readonly interval: number,
        private readonly concurrency: number,
    ) {}

    start(): void {
        this.running = true;
        this.pump();
    }

    stop(): void {
        this.running = false;
        if (this.timer) clearTimeout(this.timer);
        this.timer = undefined;
        for (const job of [...this.queue, ...this.active]) {
            job.reject(new ChannelPollCancelledError());
        }
        this.queue.length = 0;
        this.active.clear();
    }

    cancel(channelId: string): void {
        for (let index = this.queue.length - 1; index >= 0; index--) {
            const job = this.queue[index];
            if (job.channelId !== channelId) continue;
            this.queue.splice(index, 1);
            job.reject(new ChannelPollCancelledError());
        }
        this.pump();
    }

    pause(milliseconds: number): void {
        this.pausedUntil = Math.max(this.pausedUntil, Date.now() + milliseconds);
        this.pump();
    }

    get state() {
        return {
            pendingRequests: this.queue.length,
            activeRequests: this.active.size,
            pausedUntil: this.pausedUntil > Date.now() ? this.pausedUntil : undefined,
        };
    }

    schedule<T>(channelId: string, run: () => Promise<T>): Promise<T> {
        if (!this.running) return Promise.reject(new ChannelPollCancelledError());
        return new Promise<T>((resolve, reject) => {
            this.queue.push({ channelId, run, resolve, reject });
            this.pump();
        });
    }

    private pump(): void {
        if (this.timer) clearTimeout(this.timer);
        this.timer = undefined;
        if (!this.running || !this.queue.length || this.active.size >= this.concurrency) return;
        const index = this.queue.findIndex((job) =>
            ![...this.active].some((active) => active.channelId === job.channelId),
        );
        if (index < 0) return;
        const delay = Math.max(this.nextStartAt, this.pausedUntil) - Date.now();
        if (delay > 0) {
            this.timer = setTimeout(() => {
                this.timer = undefined;
                this.pump();
            }, Math.min(delay, 2147483647));
            return;
        }
        const [job] = this.queue.splice(index, 1);
        this.active.add(job);
        this.nextStartAt = Date.now() + this.interval;
        void Promise.resolve().then(() => {
            if (!this.running || !this.active.has(job)) throw new ChannelPollCancelledError();
            return job.run();
        }).then(job.resolve, job.reject).finally(() => {
            this.active.delete(job);
            this.pump();
        });
        this.pump();
    }
}
