import type { Api } from "../api";

type Invoker = (request: Api.AnyRequest, dcId?: number, options?: Api.ApiCallOptions) => Promise<unknown>;
type RequestClass = (new (args?: Record<string, unknown>) => Api.AnyRequest) & {
    classType?: string;
    hasParameters?: boolean;
};

function upperFirst(value: string): string {
    return value ? `${value[0].toUpperCase()}${value.slice(1)}` : value;
}

function asRequestClass(value: unknown): RequestClass | undefined {
    return typeof value === "function" &&
        (value as RequestClass).classType === "request"
        ? (value as RequestClass)
        : undefined;
}

/** Builds cached method helpers and a typed raw-object entry point. */
export function createApiProxy(api: Record<string, unknown>, invoke: Invoker): unknown {
    const lookup = (name: string): RequestClass | undefined => {
        const parts = name.split(".");
        if (parts.length === 1) return asRequestClass(api[upperFirst(name)]);
        if (parts.length !== 2) return undefined;
        const ns = api[parts[0]];
        return ns && typeof ns === "object"
            ? asRequestClass((ns as Record<string, unknown>)[upperFirst(parts[1])])
            : undefined;
    };
    const call = async (request: Api.RawRequest | Api.AnyRequest, options?: Api.ApiCallOptions) => {
        if (request && "classType" in request && request.classType === "request") {
            return invoke(request, options?.dcId, options);
        }
        const tag = (request as { _?: unknown })?._;
        const Ctor = typeof tag === "string" ? lookup(tag) : undefined;
        if (!Ctor) throw new TypeError(`Unknown raw API method: ${String(tag)}`);
        return invoke(new Ctor(request as unknown as Record<string, unknown>), options?.dcId, options);
    };
    const namespaceProxy = (ns: Record<string, unknown>, root = false) => {
        const cache = new Map<string, unknown>();
        return new Proxy(Object.create(null), {
            get(_target, key) {
                if (typeof key !== "string" || key === "then") return undefined;
                if (root && key === "call") return call;
                if (cache.has(key)) return cache.get(key);
                const Ctor = asRequestClass(ns[upperFirst(key)]);
                if (Ctor) {
                    const method = async (params?: Record<string, unknown>, opts?: Api.ApiCallOptions) => {
                        const options = Ctor.hasParameters ? opts : opts ?? params as Api.ApiCallOptions;
                        return invoke(new Ctor(Ctor.hasParameters ? params : {}), options?.dcId, options);
                    };
                    cache.set(key, method);
                    return method;
                }
                const value = ns[key];
                if (root && value && typeof value === "object" &&
                    Object.values(value).some(asRequestClass)) {
                    const proxy = namespaceProxy(value as Record<string, unknown>);
                    cache.set(key, proxy);
                    return proxy;
                }
                return undefined;
            },
        });
    };
    return namespaceProxy(api, true);
}
