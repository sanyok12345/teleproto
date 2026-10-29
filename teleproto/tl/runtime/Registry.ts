import bigInt from "big-integer";
import * as compiledSchema from "../generated/schema";
import { coreObjects } from "../core";
import type { BareReader } from "./fieldCodec";
import { defineClass, type ClassContext, type Fields, type TlBaseClass, type TlClass } from "./defineClass";
import { tlBases } from "./bases";
import { decodeDefinition, definitionName, type CompactSchema } from "./schema";
import { Buffer } from "../../platform";

type ApiTree = Record<string, unknown>;

function lowerFirst(value: string): string {
    return value ? value[0].toLowerCase() + value.slice(1) : value;
}

export class Registry implements ClassContext {
    readonly api: ApiTree = {};
    private readonly classes: (TlClass | undefined)[];
    private readonly byId = new Map<number, number>();
    private readonly byName = new Map<string, number>();
    private readonly byTag = new Map<string, number>();
    private readonly byResult = new Map<string, number[]>();

    constructor(
        private readonly schema: CompactSchema,
        private readonly bases: Record<string, () => TlBaseClass> = {}
    ) {
        this.classes = new Array(schema.definitions.length);
        schema.definitions.forEach(([, constructorId, , result], index) => {
            const fullName = definitionName(schema, index);
            const dot = fullName.indexOf(".");
            const namespace = dot < 0 ? undefined : fullName.slice(0, dot);
            const name = dot < 0 ? fullName : fullName.slice(dot + 1);
            this.byId.set(constructorId >>> 0, index);
            this.byName.set(fullName, index);
            this.byTag.set(namespace ? `${namespace}.${lowerFirst(name)}` : lowerFirst(name), index);
            const resultName = schema.strings[result];
            const same = this.byResult.get(resultName);
            if (same) same.push(index);
            else this.byResult.set(resultName, [index]);
            Object.defineProperty(this.namespaceOf(namespace), name, {
                configurable: true,
                enumerable: true,
                get: () => this.classAt(index),
            });
        });
    }

    get layer(): number {
        return this.schema.layer;
    }

    get constructorIds(): number[] {
        return [...this.byId.keys()];
    }

    classById(constructorId: number): TlClass | undefined {
        const index = this.byId.get(constructorId >>> 0);
        return index === undefined ? undefined : this.classAt(index);
    }

    readerFor(constructorId: number): BareReader | undefined {
        return this.classById(constructorId) ?? coreObjects.get(constructorId >>> 0);
    }

    byFullName(name: string): TlClass | undefined {
        const index = this.byName.get(name);
        return index === undefined ? undefined : this.classAt(index);
    }

    bareType(name: string): TlClass | undefined {
        return this.byFullName(name);
    }

    isTlType(type: string): boolean {
        return this.byResult.has(type);
    }

    coerce(value: unknown, expectedType: string | null): unknown {
        if (
            !value ||
            typeof value !== "object" ||
            Array.isArray(value) ||
            bigInt.isInstance(value) ||
            Buffer.isBuffer(value) ||
            typeof (value as { getBytes?: unknown }).getBytes === "function"
        ) {
            return value;
        }
        const tag = (value as { _?: string })._;
        let index: number | undefined;
        if (tag) {
            index = this.byTag.get(tag);
            if (index === undefined) throw new Error(`Unknown TL "_" tag: ${JSON.stringify(tag)}`);
        } else if (expectedType) {
            const candidates = this.byResult.get(expectedType);
            if (candidates && candidates.length > 1) {
                throw new Error(
                    `Ambiguous type "${expectedType}" — add "_" to pick a constructor ` +
                    `(one of: ${candidates.map((i) => definitionName(this.schema, i)).join(", ")})`
                );
            }
            index = candidates?.[0];
        }
        return index === undefined ? value : new (this.classAt(index))(value as Fields);
    }

    private namespaceOf(namespace: string | undefined): ApiTree {
        return namespace ? ((this.api[namespace] ??= {}) as ApiTree) : this.api;
    }

    private classAt(index: number): TlClass {
        let cls = this.classes[index];
        if (cls) return cls;
        const def = decodeDefinition(this.schema, index);
        cls = defineClass(this, def, this.bases[def.fullName]?.());
        this.classes[index] = cls;
        Object.defineProperty(this.namespaceOf(def.namespace), def.name, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: cls,
        });
        return cls;
    }
}

export const registry = new Registry(compiledSchema as CompactSchema, tlBases);

export const LAYER = registry.layer;

export const tlobjects = new Proxy({} as Record<number, TlClass>, {
    get(_target, key) {
        return typeof key === "string" && /^\d+$/.test(key) ? registry.classById(Number(key)) : undefined;
    },
    has(_target, key) {
        return typeof key === "string" && /^\d+$/.test(key) && !!registry.classById(Number(key));
    },
    ownKeys() {
        return registry.constructorIds.map(String);
    },
    getOwnPropertyDescriptor(_target, key) {
        const value = typeof key === "string" && /^\d+$/.test(key) ? registry.classById(Number(key)) : undefined;
        return value ? { value, enumerable: true, configurable: true, writable: false } : undefined;
    },
});
