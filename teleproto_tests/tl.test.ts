// TL binary layer: Writer/Reader primitives, TG byte strings, GZIPPacked.
//
// The package entry is imported first on purpose: generated/api.js binds
// `Api` from the Registry singleton at load time, so deep imports that load
// Registry before api.js would race a require cycle under Node's CJS rules
// (Bun resolves either order). Entry-first matches how consumers load it.
import { Api } from "../dist/tl/index.js";
import { describe, it, expect } from "bun:test";
import bigInt from "big-integer";
import { Writer } from "../dist/tl/binary/Writer.js";
import { Reader } from "../dist/tl/binary/Reader.js";
import { serializeBytes, serializeDate } from "../dist/tl/binary/serialize.js";
import { GZIPPacked } from "../dist/tl/core/GZIPPacked.js";
import { Buffer, crypto } from "../dist/platform/index.js";

void Api;

describe("Writer/Reader primitives", () => {
    it("round-trips ints, uints, longs and doubles", () => {
        const writer = new Writer();
        writer.int(-123456);
        writer.uint(0x3072cfa1);
        writer.long(bigInt("-5595554452916591101"));
        writer.double(123.456);
        const reader = new Reader(writer.finish());
        expect(reader.readInt()).toBe(-123456);
        expect(reader.readInt(false)).toBe(0x3072cfa1);
        expect(reader.readLong().toString()).toBe("-5595554452916591101");
        expect(reader.readDouble()).toBeCloseTo(123.456, 10);
    });

    it("round-trips large ints of several widths", () => {
        const writer = new Writer();
        const value = bigInt("283591486485412737371749274921749174");
        writer.largeInt(value, 128);
        const reader = new Reader(writer.finish());
        expect(reader.readLargeInt(128).toString()).toBe(value.toString());
    });

    it("round-trips TG byte strings short and long", () => {
        const writer = new Writer();
        const short = Buffer.alloc(10, 0xab);
        const long = Buffer.alloc(600, 0xcd); // > 254 → 4-byte header
        writer.bytes(short);
        writer.bytes(long);
        const reader = new Reader(writer.finish());
        expect(reader.tgReadBytes().equals(short)).toBe(true);
        expect(reader.tgReadBytes().equals(long)).toBe(true);
    });

    it("round-trips strings and leaves the reader at the end", () => {
        const writer = new Writer();
        writer.bytes("hello teleproto");
        const reader = new Reader(writer.finish());
        expect(reader.tgReadBytes().toString()).toBe("hello teleproto");
        expect(reader.read(-1).length).toBe(0);
    });
});

describe("serialize helpers", () => {
    it("pads serialized bytes to a multiple of four", () => {
        expect(serializeBytes("ab").length % 4).toBe(0);
        expect(serializeBytes("abc").length % 4).toBe(0);
        expect(serializeBytes("abcd").length % 4).toBe(0);
        expect(serializeBytes(Buffer.alloc(300, 7)).length % 4).toBe(0);
    });

    it("serializes unix seconds little-endian, and a Date as seconds ago", () => {
        expect(serializeDate(1767325445).readInt32LE(0)).toBe(1767325445);
        expect(serializeDate(null).readInt32LE(0)).toBe(0);
        const before = Date.now();
        const ago = serializeDate(new Date(before - 90_000)).readInt32LE(0);
        expect(ago).toBeGreaterThanOrEqual(89);
        expect(ago).toBeLessThanOrEqual((Date.now() - before) / 1000 + 92);
    });
});

describe("GZIPPacked", () => {
    it("round-trips gzip/ungzip", () => {
        const payload = Buffer.from("gzip packed payload ".repeat(10));
        const packed = GZIPPacked.gzip(payload);
        expect(Buffer.from(GZIPPacked.ungzip(packed)).equals(payload)).toBe(true);
    });

    it("wraps compressible payloads with the GZIPPacked constructor", () => {
        const payload = Buffer.alloc(300, 0x41); // "AAAA..." compresses very well
        const wrapped = GZIPPacked.gzipIfSmaller(true, payload);
        expect(wrapped.length).toBeLessThan(payload.length);
        expect(wrapped.readUInt32LE(0)).toBe(0x3072cfa1); // little-endian constructor id
        const reader = new Reader(wrapped);
        expect(Buffer.from(GZIPPacked.read(reader)).equals(payload)).toBe(true);
    });

    it("leaves small payloads alone", () => {
        const small = Buffer.alloc(100, 0x42); // below MIN_COMPRESS_SIZE
        expect(GZIPPacked.gzipIfSmaller(true, small).equals(small)).toBe(true);
    });

    it("keeps incompressible payloads unchanged", () => {
        const random = crypto.randomBytes(512);
        expect(GZIPPacked.gzipIfSmaller(true, random).equals(random)).toBe(true);
    });

    it("skips compression for non-content-related messages", () => {
        const payload = Buffer.alloc(300, 0x41);
        expect(GZIPPacked.gzipIfSmaller(false, payload).equals(payload)).toBe(true);
    });
});
