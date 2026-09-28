import type { Api } from "../tl";

export class RpcCallControl {
    private readonly controller = new AbortController();
    private timer?: ReturnType<typeof setTimeout>;
    private readonly onAbort = () => this.controller.abort(this.options.abortSignal?.reason);

    constructor(private readonly options: Api.ApiCallOptions) {
        for (const key of ["dcId", "maxRetryCount", "timeout", "floodSleepThreshold"] as const) {
            const value = options[key];
            if (value === undefined) continue;
            const minimum = key === "dcId" || key === "timeout" ? 1 : 0;
            if (!Number.isSafeInteger(value) || value < minimum || (key === "timeout" && value > 2147483647)) {
                throw new RangeError(`Invalid RPC option ${key}: ${value}`);
            }
        }
        if (options.abortSignal?.aborted) this.onAbort();
        else options.abortSignal?.addEventListener("abort", this.onAbort, { once: true });
        if (options.timeout !== undefined) {
            this.timer = setTimeout(() => {
                const error = new Error(`RPC timed out after ${options.timeout}ms`);
                error.name = "TimeoutError";
                this.controller.abort(error);
            }, options.timeout);
        }
    }

    get signal(): AbortSignal {
        return this.controller.signal;
    }

    check(): void {
        this.signal.throwIfAborted();
    }

    wait<T>(promise: PromiseLike<T> | T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const aborted = () => reject(this.signal.reason);
            if (this.signal.aborted) aborted();
            else this.signal.addEventListener("abort", aborted, { once: true });
            Promise.resolve(promise).then(resolve, reject).finally(() => {
                this.signal.removeEventListener("abort", aborted);
            });
        });
    }

    async sleep(ms: number): Promise<void> {
        let timer: ReturnType<typeof setTimeout> | undefined;
        try {
            await this.wait(new Promise<void>((resolve) => { timer = setTimeout(resolve, ms); }));
        } finally {
            if (timer) clearTimeout(timer);
        }
    }

    dispose(): void {
        if (this.timer) clearTimeout(this.timer);
        this.options.abortSignal?.removeEventListener("abort", this.onAbort);
    }
}
