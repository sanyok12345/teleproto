export interface SleepOptions {
    signal?: AbortSignal;
    ref?: boolean;
}

function abortError(signal: AbortSignal): Error {
    return Object.assign(new Error("The operation was aborted"), { name: "AbortError", code: "ABORT_ERR", cause: signal.reason });
}

export function sleep(ms: number, options: SleepOptions = {}): Promise<void> {
    const { signal, ref = true } = options;
    if (signal?.aborted) return Promise.reject(abortError(signal));
    return new Promise((resolve, reject) => {
        const abort = () => {
            clearTimeout(timer);
            reject(abortError(signal!));
        };
        const timer = setTimeout(() => {
            signal?.removeEventListener("abort", abort);
            resolve();
        }, ms);
        if (!ref) (timer as { unref?: () => void }).unref?.();
        signal?.addEventListener("abort", abort, { once: true });
    });
}

export function immediate(callback: () => void): void {
    const native = (globalThis as { setImmediate?: (callback: () => void) => unknown }).setImmediate;
    if (native) native(callback);
    else setTimeout(callback, 0);
}
