import * as common from "./Common";
import * as proxy from "./ProxyRejectedError";
import * as files from "./FileErrors";
import * as base from "./RPCBaseErrors";
import * as list from "./RPCErrorList";
import * as aliases from "./aliases";

type Exports = typeof common & typeof proxy & typeof files & typeof base & typeof list & typeof aliases;

type ErrorClassName = {
    [K in keyof Exports]: Exports[K] extends abstract new (...args: never[]) => Error ? K : never;
}[keyof Exports];

type ErrorOf<K extends ErrorClassName> = Exports[K] extends abstract new (...args: never[]) => infer E ? E : never;

/** Error handlers keyed by error class name; each receives the error typed as that class. */
export type ErrorHandlers<R> = {
    [K in ErrorClassName]?: (error: ErrorOf<K>) => R | Promise<R>;
};

type Handler<R> = (error: never) => R | Promise<R>;

const classes: Record<string, unknown> = { ...common, ...proxy, ...files, ...base, ...list, ...aliases };

/**
 * Runs the handler of the most specific class `error` belongs to, so `ChatWriteForbiddenError`
 * wins over `ForbiddenError` whatever the key order. Rethrows `error` when no handler matches.
 */
export async function match<R>(error: unknown, handlers: ErrorHandlers<R>): Promise<R> {
    const byPrototype = new Map<object, Handler<R>>();
    for (const [name, handler] of Object.entries(handlers) as [string, Handler<R> | undefined][]) {
        const cls = classes[name];
        if (handler && typeof cls === "function") byPrototype.set(cls.prototype, handler);
    }
    let prototype: object | null = error !== null && typeof error === "object" ? Object.getPrototypeOf(error) : null;
    for (; prototype; prototype = Object.getPrototypeOf(prototype)) {
        const handler = byPrototype.get(prototype);
        if (handler) return handler(error as never);
    }
    throw error;
}

/** {@link match} as a `.catch()` callback. */
export function handle<R>(handlers: ErrorHandlers<R>): (error: unknown) => Promise<R> {
    return (error) => match(error, handlers);
}
