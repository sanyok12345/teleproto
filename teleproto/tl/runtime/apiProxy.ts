type Invoker = (request: unknown, dcId?: number) => Promise<unknown>;

interface ApiCallOptions {
    dcId?: number;
    abortSignal?: AbortSignal;
    floodSleepThreshold?: number;
}

type RequestClass = (new (args?: Record<string, unknown>) => unknown) & {
    classType?: string;
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

export function createApiProxy(
    api: Record<string, unknown>,
    invoke: Invoker
): unknown {
    const callMethod =
        (Ctor: RequestClass) =>
        (params?: Record<string, unknown>, opts?: ApiCallOptions) =>
            invoke(new Ctor(params || {}), opts?.dcId);

    const namespaceProxy = (ns: Record<string, unknown>) =>
        new Proxy(Object.create(null), {
            get(_target, key) {
                if (typeof key !== "string") return undefined;
                const Ctor = asRequestClass(ns[upperFirst(key)]);
                return Ctor ? callMethod(Ctor) : undefined;
            },
        });

    return new Proxy(Object.create(null), {
        get(_target, key) {
            if (typeof key !== "string") return undefined;
            const direct = api[key];
            if (direct && typeof direct === "object") {
                return namespaceProxy(direct as Record<string, unknown>);
            }
            const Ctor = asRequestClass(api[upperFirst(key)]);
            return Ctor ? callMethod(Ctor) : undefined;
        },
    });
}
