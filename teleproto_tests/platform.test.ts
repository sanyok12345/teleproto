// Runtime seam: every `#platform/*` split module must load and expose the
// node implementation under both Node.js and Bun.
import { describe, it, expect } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Buffer } from "../dist/platform/buffer/index.js";
import * as compression from "../dist/platform/compression/index.js";
import * as crypto from "../dist/platform/crypto/index.js";
import * as events from "../dist/platform/events/index.js";
import * as fs from "../dist/platform/fs/index.js";
import * as net from "../dist/platform/net/index.js";
import * as storage from "../dist/platform/storage/index.js";
import * as system from "../dist/platform/system/index.js";
import * as timers from "../dist/platform/timers/index.js";

describe("platform seam", () => {
    it("picks the node variant for every split module", () => {
        expect(net.tcp).toBe(true);
        expect(typeof net.createSocket).toBe("function");
        expect(typeof net.httpConnect).toBe("function");
        expect(typeof net.socksConnect).toBe("function");
        expect(typeof fs.open).toBe("function");
        expect(typeof storage.open).toBe("function");
        expect(typeof events.setMaxListeners).toBe("function");
        expect(typeof system.deviceModel).toBe("function");
    });

    it("reports the runtime device model", () => {
        const model = system.deviceModel();
        const version = system.systemVersion();
        expect(model.length).toBeGreaterThan(0);
        expect(version.length).toBeGreaterThan(0);
    });

    it("classifies IP addresses", () => {
        expect(net.isIP("149.154.167.51")).toBe(4);
        expect(net.isIP("::1")).toBe(6);
        expect(net.isIP("not-an-ip")).toBe(0);
    });

    it("creates and destroys a TCP socket", () => {
        const socket = net.createSocket();
        expect(socket).toBeDefined();
        socket.destroy();
    });

    it("does positional reads and writes through the fs layer", async () => {
        const dir = await mkdtemp(join(tmpdir(), "teleproto-fs-"));
        try {
            const file = join(dir, "data.bin");
            const handle = await fs.open(file, "w");
            await handle.write(Buffer.from("0123456789abcdef"), 0, 16, 0);
            await handle.write(Buffer.from("XY"), 0, 2, 4);
            await handle.close();

            const reader = await fs.open(file, "r");
            const out = Buffer.alloc(6);
            await reader.read(out, 0, 6, 4);
            await reader.close();
            expect(out.toString()).toBe("XY6789");

            expect(await fs.size(file)).toBe(16);
            expect(fs.exists(file)).toBe(true);
            expect(fs.isDirectory(dir)).toBe(true);
        } finally {
            await rm(dir, { recursive: true, force: true });
        }
    });

    it("reads a file whole", async () => {
        const dir = await mkdtemp(join(tmpdir(), "teleproto-fs-"));
        try {
            const file = join(dir, "whole.bin");
            const handle = await fs.open(file, "w");
            await handle.write(Buffer.from("payload"), 0, 7, 0);
            await handle.close();
            const data = await fs.readFile(file);
            expect(data.toString()).toBe("payload");
        } finally {
            await rm(dir, { recursive: true, force: true });
        }
    });

    it("opens a persistent storage area", () => {
        const area = storage.open(join(tmpdir(), `teleproto-storage-${Date.now()}`));
        area.setItem("key", "value");
        expect(area.getItem("key")).toBe("value");
        area.removeItem("key");
        expect(area.getItem("key")).toBe(null);
    });

    it("raises the listener cap on an AbortSignal", () => {
        const controller = new AbortController();
        expect(() => events.setMaxListeners(0, controller.signal)).not.toThrow();
    });

    it("sleeps and schedules immediates", async () => {
        const start = Date.now();
        await timers.sleep(25, { ref: false });
        expect(Date.now() - start).toBeGreaterThanOrEqual(20);
        const ran = new Promise<void>((resolve) => timers.immediate(resolve));
        await ran;
    });

    it("sleeps through an abort signal", async () => {
        const controller = new AbortController();
        const aborted = timers.sleep(10_000, { signal: controller.signal });
        controller.abort();
        await expect(aborted).rejects.toMatchObject({ name: "AbortError" });
    });

    it("round-trips gzip and crc32", () => {
        const payload = Buffer.from("compress me please ".repeat(20));
        const packed = compression.gzip(payload);
        expect(packed.length).toBeLessThan(payload.length);
        expect(Buffer.from(compression.gunzip(packed)).equals(payload)).toBe(true);
        expect(compression.crc32(Buffer.from("123456789"))).toBe(0xcbf43926);
    });

    it("exposes crypto helpers", () => {
        const digest = crypto.hash("sha256", Buffer.from("abc")).toString("hex");
        expect(digest).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
        const key = crypto.x25519PublicKey();
        expect(key.length).toBe(32);
    });
});
