// Sessions: StringSession wire format (incl. the Telethon-compatible form)
// and StoreSession persistence through the platform storage layer.
//
// Order matters, like for a real client: the DC is chosen first, and setDC
// to a new DC resets the in-memory auth key unless it is cached per-DC, so
// setAuthKey comes after setDC.
import { describe, it, expect, afterEach } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { StringSession } from "../dist/sessions/StringSession.js";
import { StoreSession } from "../dist/sessions/StoreSession.js";
import { AuthKey } from "../dist/crypto/AuthKey.js";
import { Buffer, crypto } from "../dist/platform/index.js";

const cleanups: string[] = [];
afterEach(async () => {
    while (cleanups.length) {
        await rm(cleanups.pop()!, { recursive: true, force: true });
    }
});

async function makeAuthKey(): Promise<AuthKey> {
    const key = new AuthKey();
    await key.setKey(crypto.randomBytes(256));
    return key;
}

describe("StringSession", () => {
    it("round-trips dc, address, port and auth key", async () => {
        const session = new StringSession();
        session.setDC(2, "149.154.167.51", 443);
        session.authKey = await makeAuthKey();

        const saved = session.save();
        expect(saved.startsWith("1")).toBe(true);

        const restored = new StringSession(saved);
        expect(restored.dcId).toBe(2);
        expect(restored.serverAddress).toBe("149.154.167.51");
        expect(restored.port).toBe(443);
        await restored.load(); // builds the AuthKey from the stored key bytes
        expect(restored.authKey?.getKey()?.equals(session.authKey!.getKey()!)).toBe(true);
    });

    it("round-trips an IPv6 server address", async () => {
        const session = new StringSession();
        session.setDC(4, "2001:67a:2:0::f0f", 443);
        session.authKey = await makeAuthKey();
        const restored = new StringSession(session.save());
        expect(restored.dcId).toBe(4);
        expect(restored.serverAddress).toBe("2001:67a:2:0::f0f");
        expect(restored.port).toBe(443);
    });

    it("parses the Telethon-compatible form", () => {
        // Telethon writes dcId(1) + ipv4(4) + port(2) + authKey(256) as one
        // base64 blob after the version char; the unpadded length of the blob
        // is how the 352-char branch is detected.
        const key = Buffer.alloc(256, 0x55);
        const port = Buffer.alloc(2);
        port.writeUInt16BE(443, 0);
        const payload = Buffer.concat([Buffer.from([2]), Buffer.from([149, 154, 167, 51]), port, key]);
        const telethon = "1" + payload.toString("base64");
        expect(telethon.length).toBe(353); // version char + 352 base64 chars

        const session = new StringSession(telethon);
        expect(session.dcId).toBe(2);
        expect(session.serverAddress).toBe("149.154.167.51");
        expect(session.port).toBe(443);
        expect(session._key?.equals(key)).toBe(true);
    });

    it("rejects strings from another format", () => {
        expect(() => new StringSession("2AAAA")).toThrow(/valid/i);
        expect(() => new StringSession("")).not.toThrow();
    });
});

describe("StoreSession", () => {
    it("persists dc and auth key across instances", async () => {
        const dir = await mkdtemp(join(tmpdir(), "teleproto-store-"));
        cleanups.push(dir);

        const key = await makeAuthKey();
        const first = new StoreSession(dir);
        await first.load();
        first.setDC(3, "149.154.175.53", 443);
        first.authKey = key;
        first.setUpdateState({ pts: 42, date: 1700000000, seq: 7 } as never);

        const second = new StoreSession(dir);
        await second.load();
        expect(second.dcId).toBe(3);
        expect(second.serverAddress).toBe("149.154.175.53");
        expect(second.port).toBe(443);
        expect(second.authKey?.getKey()?.equals(key.getKey()!)).toBe(true);
        expect((second.getUpdateState() as { pts?: number } | undefined)?.pts).toBe(42);
    });

    it("keeps the previous dc's key in the per-DC cache", async () => {
        const dir = await mkdtemp(join(tmpdir(), "teleproto-store-"));
        cleanups.push(dir);

        const key = await makeAuthKey();
        const first = new StoreSession(dir);
        await first.load();
        first.setDC(2, "149.154.167.51", 443);
        first.authKey = key;
        // moving to another dc: the dc-2 key must land in the per-DC cache
        first.setDC(4, "149.154.167.91", 443);

        const second = new StoreSession(dir);
        await second.load();
        expect(second.dcId).toBe(4);
        expect(second.authKey).toBeUndefined();
        const cached = second.getAuthKey(2);
        expect(cached?.getKey()?.equals(key.getKey()!)).toBe(true);
    });

    it("deletes only its own keys", async () => {
        const dir = await mkdtemp(join(tmpdir(), "teleproto-store-"));
        cleanups.push(dir);
        const area = new StoreSession(dir);
        await area.load();
        area.setDC(2, "149.154.167.51", 443);
        area.authKey = await makeAuthKey();

        area.delete();
        const fresh = new StoreSession(dir);
        await fresh.load();
        expect(fresh.authKey).toBeUndefined();
        expect(fresh.dcId).toBe(0); // MemorySession default dcId
    });
});
