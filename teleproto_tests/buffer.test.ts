// Buffer contracts that the rest of the library relies on (toBuffer,
// hex/base64 wire formats, view arithmetic).
import { describe, it, expect } from "bun:test";
import { Buffer } from "../dist/platform/buffer/index.js";

describe("platform Buffer", () => {
    it("round-trips hex and base64", () => {
        const bytes = Buffer.from("wire format bytes", "utf8");
        expect(Buffer.from(bytes.toString("hex"), "hex").equals(bytes)).toBe(true);
        expect(Buffer.from(bytes.toString("base64"), "base64").equals(bytes)).toBe(true);
    });

    it("supports alloc, allocUnsafe and fill", () => {
        expect(Buffer.alloc(8).every((byte) => byte === 0)).toBe(true);
        expect(Buffer.alloc(8, 0xab).every((byte) => byte === 0xab)).toBe(true);
        expect(Buffer.allocUnsafe(8).length).toBe(8);
    });

    it("subarray shares memory with the parent", () => {
        const parent = Buffer.from([1, 2, 3, 4, 5]);
        const view = parent.subarray(1, 4);
        expect(view.length).toBe(3);
        view[0] = 0x99;
        expect(parent[1]).toBe(0x99);
    });

    it("wraps a Uint8Array view without copying when given buffer+offset", () => {
        const u8 = new Uint8Array([9, 9, 1, 2, 3, 9, 9]);
        const view = Buffer.from(u8.buffer, u8.byteOffset + 2, 3);
        expect(view.toString("hex")).toBe("010203");
        view[0] = 0x77;
        expect(u8[2]).toBe(0x77);
    });

    it("concatenates", () => {
        const joined = Buffer.concat([Buffer.from("ab", "hex"), Buffer.from("cd", "hex")]);
        expect(joined.toString("hex")).toBe("abcd");
    });

    it("isBuffer and encodings", () => {
        expect(Buffer.isBuffer(Buffer.alloc(1))).toBe(true);
        expect(Buffer.isBuffer(new Uint8Array(1))).toBe(false);
        expect(Buffer.from([0xe2, 0x82, 0xac]).toString("utf8")).toBe("€");
        expect(Buffer.from("€", "utf8").length).toBe(3);
    });

    it("reads and writes integers in both endians", () => {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt32BE(0x3072cfa1, 0);
        expect(buffer.readUInt32BE(0)).toBe(0x3072cfa1);
        buffer.writeInt32LE(-1, 4);
        expect(buffer.readInt32LE(4)).toBe(-1);
        expect(buffer.readUInt32LE(4)).toBe(0xffffffff);
    });

    it("writes big integers as 64-bit little endian", () => {
        const buffer = Buffer.alloc(8);
        buffer.writeBigInt64LE(BigInt.asIntN(64, -5595554452916591101n), 0);
        expect(buffer.readBigInt64LE(0)).toBe(BigInt.asIntN(64, -5595554452916591101n));
    });
});
