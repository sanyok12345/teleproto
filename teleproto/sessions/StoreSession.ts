import { MemorySession } from "./Memory";
import store, { StoreBase } from "store2";
import { AuthKey } from "../crypto/AuthKey";
import bigInt from "big-integer";
import { LocalStorage } from "node-localstorage";

/**
 * Persistent session that stores auth keys and entity data on disk using `node-localstorage`.
 *
 * Creates a directory named after the session in the current working directory.
 * Suitable for long-running server applications where session data must survive restarts.
 *
 * @example
 * ```ts
 * const session = new StoreSession("my_session");
 * const client = new TelegramClient(session, apiId, apiHash, {});
 * ```
 */
export class StoreSession extends MemorySession {
    private readonly sessionName: string;
    private store: StoreBase;

    constructor(sessionName: string, divider = ":") {
        super();
        if (sessionName === "session") {
            throw new Error(
                "Session name can't be 'session'. Please use a different name."
            );
        }
        this.store = store.area(
            sessionName,
            new LocalStorage("./" + sessionName)
        );
        if (divider == undefined) {
            divider = ":";
        }
        this.sessionName = sessionName + divider;
    }

    async load() {
        let authKey = this.store.get(this.sessionName + "authKey");
        if (authKey && typeof authKey === "object") {
            this._authKey = new AuthKey();
            if ("data" in authKey) {
                authKey = Buffer.from(authKey.data);
            }
            await this._authKey.setKey(authKey);
        }

        const dcId = this.store.get(this.sessionName + "dcId");
        if (dcId) {
            this._dcId = dcId;
        }

        const port = this.store.get(this.sessionName + "port");
        if (port) {
            this._port = port;
        }
        const serverAddress = this.store.get(
            this.sessionName + "serverAddress"
        );
        if (serverAddress) {
            this._serverAddress = serverAddress;
        }
        const testServers = this.store.get(this.sessionName + "testServers");
        if (testServers != null) {
            super.testServers = !!testServers;
        }

        // Reload cached per-DC (non-main) auth keys so we don't have to do a
        // fresh DH handshake every process start.
        const dcKeys = this.store.get(this.sessionName + "dcAuthKeys");
        if (dcKeys && typeof dcKeys === "object") {
            for (const [k, v] of Object.entries(dcKeys)) {
                const id = Number(k);
                if (!Number.isFinite(id) || !v || typeof v !== "object") continue;
                let buf: Buffer | undefined;
                if (Buffer.isBuffer(v)) buf = v as Buffer;
                else if ("data" in (v as any)) buf = Buffer.from((v as any).data);
                if (!buf) continue;
                const key = new AuthKey();
                await key.setKey(buf);
                this._dcAuthKeys.set(id, key);
            }
        }
    }

    setAuthKey(authKey?: AuthKey, dcId?: number) {
        super.setAuthKey(authKey, dcId);
        if (dcId !== undefined && dcId !== this._dcId) {
            // Persist non-main DC keys as a plain {dcId: Buffer} map so a
            // later process can reuse them and avoid hitting Telegram's
            // per-account auth-key cap.
            const snapshot: Record<string, Buffer | undefined> = {};
            for (const [id, k] of this._dcAuthKeys) {
                const raw = k.getKey();
                if (raw) snapshot[String(id)] = raw;
            }
            this.store.set(this.sessionName + "dcAuthKeys", snapshot);
        }
    }

    setDC(dcId: number, serverAddress: string, port: number) {
        this.store.set(this.sessionName + "dcId", dcId);
        this.store.set(this.sessionName + "port", port);
        this.store.set(this.sessionName + "serverAddress", serverAddress);
        super.setDC(dcId, serverAddress, port);
    }

    set testServers(value: boolean) {
        super.testServers = value;
        this.store.set(this.sessionName + "testServers", value);
    }

    get testServers() {
        return super.testServers;
    }

    set authKey(value: AuthKey | undefined) {
        this._authKey = value;
        this.store.set(this.sessionName + "authKey", value?.getKey());
    }

    get authKey() {
        return this._authKey;
    }

    processEntities(tlo: any) {
        const rows = this._entitiesToRows(tlo);
        if (!rows) {
            return;
        }
        for (const row of rows) {
            row.push(new Date().getTime().toString());
            this.store.set(this.sessionName + row[0], row);
        }
    }

    getEntityRowsById(
        id: string | bigInt.BigInteger,
        exact: boolean = true
    ): any {
        return this.store.get(this.sessionName + id.toString());
    }
}
