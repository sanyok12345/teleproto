import { generateRandomLong } from "../../Helpers";
import { Writer } from "../binary/Writer";
import type { Reader } from "../binary/Reader";
import {
    compileFieldsCopier,
    compileFieldsReader,
    emptyValue,
    isAbsent,
    normalizeField,
    writeField,
    type CodecContext,
    type FieldsCopier,
    type FieldsReader,
} from "./fieldCodec";
import { castInput, inputCastOf, type TlClient, type TlUtils } from "./inputCasts";
import type { ClassDef } from "./schema";
import { Buffer } from "../../platform";

const INSPECT_CUSTOM = Symbol.for("nodejs.util.inspect.custom");

export type Fields = Record<string, unknown>;

export interface TlObject extends Fields {
    _write(writer: Writer, boxed?: boolean): void;
    _coerceArgs(): void;
    init(args: Fields): void;
}

export interface TlClass {
    new(args?: Fields): TlObject;
    readonly CONSTRUCTOR_ID: number;
    readonly SUBCLASS_OF_ID: number;
    readonly className: string;
    readonly classType: "constructor" | "request";
    readonly hasParameters: boolean;
    fromReader(reader: Reader): TlObject;
}

export type TlBaseClass = new (args: Fields) => object;

export interface ClassContext extends CodecContext {
    isTlType(type: string): boolean;
}

class TlBase {
    constructor(args: Fields) {
        this.init(args);
    }

    init(_args: Fields): void {}
}

const baseInit = TlBase.prototype.init;

export function defineClass(context: ClassContext, def: ClassDef, base?: TlBaseClass): TlClass {
    const { fields, fullName, constructorId, subclassOfId, isFunction, result } = def;
    const classType = isFunction ? "request" : "constructor";
    const flagSiblings = fields.map((field, index) =>
        field.isFlag && field.type !== "true"
            ? fields.flatMap((other, otherIndex) =>
                otherIndex !== index && other.isFlag && other.flagField === field.flagField && other.flagBit === field.flagBit
                    ? [otherIndex]
                    : []
            )
            : []
    );
    const flagMembers = fields.map((field, index) =>
        field.isFlagsIndicator ? fields.flatMap((other, otherIndex) => (other.flagField === index ? [otherIndex] : [])) : []
    );
    const resultVector = /Vector<(int|long)>/.exec(result)?.[1];

    let readFields: FieldsReader | undefined;
    let copyFields: FieldsCopier | undefined;

    const Base = (base ?? TlBase) as unknown as typeof TlBase;

    class TlConstructor extends Base {
        static readonly CONSTRUCTOR_ID = constructorId;
        static readonly SUBCLASS_OF_ID = subclassOfId;
        static readonly className = fullName;
        static readonly classType = classType;
        static readonly hasParameters = fields.some((field) => !field.isFlagsIndicator);

        constructor(args?: Fields) {
            args = args || {};
            super(args);
            const self = this as unknown as Fields;
            self.originalArgs = args;
            for (const field of fields) {
                const name = field.name;
                if (name === "randomId" && !args[name]) {
                    self[name] = field.isVector
                        ? ((args.id as unknown[]) || []).map(() => generateRandomLong(true))
                        : generateRandomLong(true);
                } else {
                    self[name] = args[name];
                }
            }
        }

        static fromReader(this: TlClass, reader: Reader): TlObject {
            const object = Object.create(this.prototype) as TlObject;
            readFields ??= compileFieldsReader(context, fields);
            if (object.init === baseInit) {
                readFields(reader, object);
                return object;
            }
            const args: Fields = {};
            readFields(reader, args);
            object.init(args);
            (copyFields ??= compileFieldsCopier(fields))(object, args);
            return object;
        }

        _coerceArgs(): void {
            const self = this as unknown as Fields;
            for (const field of fields) {
                const value = self[field.name];
                const normalized = normalizeField(context, field, value);
                if (normalized !== value) self[field.name] = normalized;
            }
        }

        _write(writer: Writer, boxed = true): void {
            this._coerceArgs();
            const self = this as unknown as Fields;
            if (boxed) writer.uint(constructorId);
            fields.forEach((field, index) => {
                if (field.isFlagsIndicator) {
                    let flags = 0;
                    for (const member of flagMembers[index]) {
                        if (!isAbsent(fields[member], self[fields[member].name])) flags |= 1 << fields[member].flagBit;
                    }
                    writer.uint(flags);
                    return;
                }
                let value = self[field.name];
                if (field.isFlag) {
                    if (field.type === "true") return;
                    if (isAbsent(field, value)) {
                        if (!flagSiblings[index].some((other) => !isAbsent(fields[other], self[fields[other].name]))) return;
                        value = emptyValue(field);
                    }
                }
                writeField(writer, fullName, field, value);
            });
        }

        getBytes(): Buffer {
            const writer = new Writer();
            this._write(writer);
            return writer.finish();
        }

        readResult(reader: Reader): unknown {
            if (!isFunction) throw new Error("`readResult()` called for non-request instance");
            if (result === "X") {
                this._coerceArgs();
                const query = (this as unknown as { query?: { readResult?: (reader: Reader) => unknown } }).query;
                if (typeof query?.readResult !== "function") throw new TypeError("query must be a TL request");
                return query.readResult(reader);
            }
            if (resultVector) {
                reader.readInt();
                const length = reader.readInt();
                const values = new Array(length);
                for (let i = 0; i < length; i++) values[i] = resultVector === "int" ? reader.readInt() : reader.readLong();
                return values;
            }
            return reader.tgReadObject();
        }

        async resolve(client: TlClient, utils: TlUtils, seen = new Set<unknown>()): Promise<void> {
            if (!isFunction && seen.size === 0) throw new Error("`resolve()` called for non-request instance");
            if (seen.has(this)) return;
            seen.add(this);
            this._coerceArgs();
            const self = this as unknown as Fields;
            for (const field of fields) {
                if (field.isFlagsIndicator || self[field.name] == null) continue;
                const cast = inputCastOf(field);
                if (!cast && field.type !== "X" && !context.isTlType(field.type ?? "")) continue;
                const resolveItem = async (item: unknown): Promise<unknown> => {
                    const nested = item as { resolve?: (c: TlClient, u: TlUtils, s: Set<unknown>) => Promise<void> } | null;
                    if (nested && typeof nested === "object" && typeof nested.resolve === "function") {
                        await nested.resolve(client, utils, seen);
                    }
                    return cast ? castInput(utils, client, item, cast) : item;
                };
                const value = self[field.name];
                if (field.isVector && Array.isArray(value)) {
                    const resolved = [];
                    for (const item of value) resolved.push(await resolveItem(item));
                    self[field.name] = resolved;
                } else {
                    self[field.name] = await resolveItem(value);
                }
            }
        }

        toJSON(): Fields {
            return { ...(this as unknown as { originalArgs: Fields }).originalArgs, className: fullName };
        }
    }

    const prototype = TlConstructor.prototype as unknown as Record<string | symbol, unknown>;
    Object.defineProperties(prototype, {
        CONSTRUCTOR_ID: { value: constructorId, writable: true, configurable: true },
        SUBCLASS_OF_ID: { value: subclassOfId, writable: true, configurable: true },
        className: { value: fullName, writable: true, configurable: true },
        classType: { value: classType, writable: true, configurable: true },
        originalArgs: {
            configurable: true,
            get(this: Fields) {
                const args: Fields = {};
                for (const field of fields) if (this[field.name] !== undefined) args[field.name] = this[field.name];
                return args;
            },
            set(this: Fields, value: unknown) {
                Object.defineProperty(this, "originalArgs", { value, writable: true, enumerable: true, configurable: true });
            },
        },
    });
    prototype[INSPECT_CUSTOM] = function (
        this: Fields,
        _depth: number,
        options: unknown,
        inspect?: (value: unknown, opts: unknown) => string
    ): string {
        const view: Fields = {};
        for (const field of fields) {
            const value = this[field.name];
            if (value !== null && value !== undefined) view[field.name] = value;
        }
        return `${fullName} ${(inspect ?? ((value: unknown) => JSON.stringify(value)))(view, options)}`;
    };
    Object.defineProperty(TlConstructor, "name", { value: fullName, configurable: true });
    return TlConstructor as unknown as TlClass;
}
