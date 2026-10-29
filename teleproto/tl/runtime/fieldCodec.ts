import bigInt, { type BigInteger } from "big-integer";
import { returnBigInt } from "../../Helpers";
import type { Reader } from "../binary/Reader";
import type { Writer } from "../binary/Writer";
import type { FieldDef } from "./schema";
import { Buffer } from "../../platform";

const VECTOR_ID = 0x1cb5c415;
const BOOL_TRUE = 0x997275b5;
const BOOL_FALSE = 0xbc799737;
const BIG_TYPES = new Set(["long", "int128", "int256"]);

export interface BareReader {
    fromReader(reader: Reader): unknown;
}

export interface WritableObject {
    _write?(writer: Writer, boxed?: boolean): void;
    getBytes?(): Buffer;
}

export interface CodecContext {
    bareType(name: string): BareReader | undefined;
    coerce(value: unknown, expectedType: string | null): unknown;
}

export function isAbsent(field: FieldDef, value: unknown): boolean {
    return value === null || value === undefined || (value === false && field.type !== "Bool");
}

export function emptyValue(field: FieldDef): unknown {
    if (field.isVector) return [];
    if (field.type === "string") return "";
    if (field.type === "bytes") return Buffer.alloc(0);
    if (field.type === "int" || field.type === "long" || field.type === "double") return 0;
    throw new Error(
        `Cannot co-serialize flag field of type "${field.type}": a sibling on the same flag bit is set but this field is missing and has no empty form`
    );
}

function dateSeconds(value: unknown): number {
    if (!value) return 0;
    if (value instanceof Date) return Math.floor(value.getTime() / 1000);
    if (typeof value === "number") return value;
    throw new Error(`Cannot interpret "${String(value)}" as a date`);
}

function readValue(context: CodecContext, reader: Reader, field: FieldDef): unknown {
    switch (field.type) {
        case "int":
            return reader.readInt();
        case "long":
            return reader.readLong();
        case "int128":
            return reader.readLargeInt(128);
        case "int256":
            return reader.readLargeInt(256);
        case "double":
            return reader.readDouble();
        case "string":
            return reader.tgReadString();
        case "Bool":
            return reader.tgReadBool();
        case "true":
            return true;
        case "bytes":
            return reader.tgReadBytes();
        case "date":
            return reader.tgReadDate();
        default: {
            if (!field.bare) return reader.tgReadObject();
            const bare = context.bareType(field.type as string);
            if (!bare) throw new Error(`Unknown bare TL type ${field.type}`);
            return bare.fromReader(reader);
        }
    }
}

export function readField(context: CodecContext, reader: Reader, field: FieldDef): unknown {
    if (field.isFlagsIndicator) return reader.readInt();
    if (!field.isVector) return readValue(context, reader, field);
    if (field.useVectorId) reader.readInt();
    const length = reader.readInt();
    const items = new Array(length);
    for (let i = 0; i < length; i++) items[i] = readValue(context, reader, field);
    return items;
}

function writeValue(writer: Writer, owner: string, field: FieldDef, value: unknown): void {
    switch (field.type) {
        case "int":
            writer.int((value as number) ?? 0);
            return;
        case "long":
            writer.long(value == null ? bigInt.zero : (value as BigInteger));
            return;
        case "int128":
            writer.largeInt(value == null ? bigInt.zero : (value as BigInteger), 16);
            return;
        case "int256":
            writer.largeInt(value == null ? bigInt.zero : (value as BigInteger), 32);
            return;
        case "double":
            writer.double((value as number) ?? 0);
            return;
        case "date":
            writer.int(dateSeconds(value));
            return;
        case "Bool":
            writer.uint(value ? BOOL_TRUE : BOOL_FALSE);
            return;
        case "true":
            return;
        case "string":
        case "bytes":
            if (value == null) throw new Error(`Required field "${field.name}" of ${owner} is missing`);
            if (typeof value !== "string" && !Buffer.isBuffer(value)) throw new Error(`Bytes or str expected, not ${typeof value}`);
            writer.bytes(value);
            return;
        default: {
            const object = value as WritableObject | undefined;
            if (!object || (typeof object._write !== "function" && typeof object.getBytes !== "function")) {
                throw new Error(`Required object ${field.name} of ${owner} is undefined`);
            }
            const boxed = !field.bare;
            if (typeof object._write === "function") object._write(writer, boxed);
            else writer.raw(boxed ? object.getBytes!() : object.getBytes!().subarray(4));
        }
    }
}

export function writeField(writer: Writer, owner: string, field: FieldDef, value: unknown): void {
    if (!field.isVector) {
        writeValue(writer, owner, field, value);
        return;
    }
    const list = (value || []) as unknown[];
    if (field.useVectorId) writer.uint(VECTOR_ID);
    writer.int(list.length);
    for (const item of list) writeValue(writer, owner, field, item);
}

export function normalizeField(context: CodecContext, field: FieldDef, value: unknown): unknown {
    if (value == null || field.isFlagsIndicator) return value;
    if (BIG_TYPES.has(field.type ?? "")) {
        return field.isVector ? (value as Parameters<typeof returnBigInt>[0][]).map(returnBigInt) : returnBigInt(value as never);
    }
    if (typeof value !== "object") return value;
    if (field.isVector) return Array.isArray(value) ? value.map((item) => context.coerce(item, field.type)) : value;
    return context.coerce(value, field.type);
}

const INLINE_READS: Record<string, string> = {
    int: "reader.readInt()",
    long: "reader.readLong()",
    int128: "reader.readLargeInt(128)",
    int256: "reader.readLargeInt(256)",
    double: "reader.readDouble()",
    string: "reader.tgReadString()",
    Bool: "reader.tgReadBool()",
    bytes: "reader.tgReadBytes()",
    date: "reader.tgReadDate()",
};

export type FieldsReader = (reader: Reader, target: Record<string, unknown>) => void;
export type FieldsCopier = (target: Record<string, unknown>, source: Record<string, unknown>) => void;

function fieldReadExpression(field: FieldDef, index: number): string {
    if (field.isFlagsIndicator) return "reader.readInt()";
    if (!field.isVector && field.type && INLINE_READS[field.type]) return INLINE_READS[field.type];
    if (!field.isVector && !field.bare) return "reader.tgReadObject()";
    return `readField(context, reader, fields[${index}])`;
}

function interpretFieldsReader(context: CodecContext, fields: FieldDef[]): FieldsReader {
    return (reader, target) => {
        for (const field of fields) {
            const set = !field.isFlag || ((target[fields[field.flagField].name] as number) & (1 << field.flagBit)) !== 0;
            target[field.name] = field.type === "true" ? set : set ? readField(context, reader, field) : null;
        }
    };
}

export function compileFieldsReader(context: CodecContext, fields: FieldDef[]): FieldsReader {
    const lines = fields.map((field, index) => {
        const target = `target[${JSON.stringify(field.name)}]`;
        if (!field.isFlag) return `${target} = ${fieldReadExpression(field, index)};`;
        const set = `(target[${JSON.stringify(fields[field.flagField].name)}] & ${1 << field.flagBit}) !== 0`;
        return field.type === "true"
            ? `${target} = ${set};`
            : `${target} = ${set} ? ${fieldReadExpression(field, index)} : null;`;
    });
    try {
        return new Function("readField", "context", "fields", `return function read(reader, target) {\n${lines.join("\n")}\n};`)(
            readField,
            context,
            fields
        ) as FieldsReader;
    } catch {
        return interpretFieldsReader(context, fields);
    }
}

export function compileFieldsCopier(fields: FieldDef[]): FieldsCopier {
    const lines = fields.map((field) => `target[${JSON.stringify(field.name)}] = source[${JSON.stringify(field.name)}];`);
    try {
        return new Function("target", "source", lines.join("\n")) as FieldsCopier;
    } catch {
        return (target, source) => {
            for (const field of fields) target[field.name] = source[field.name];
        };
    }
}
