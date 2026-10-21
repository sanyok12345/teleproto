import type { AuthKey } from "../crypto/AuthKey";
import type { EntityLike } from "../define";
import { Api } from "../tl";

export interface StoredUpdateState {
    pts: number;
    qts: number;
    date: number;
    seq: number;
    channels: Record<string, number>;
}

export abstract class Session {
    /**
     * Creates a clone of this session file
     * @param toInstance {Session|null}
     * @returns {Session}
     */

    /* CONTEST
    clone(toInstance = null) {
        return toInstance || new this.constructor()
    }*/

    /**
     * Sets the information of the data center address and port that
     * the library should connect to, as well as the data center ID,
     * which is currently unused.
     * @param dcId {number}
     * @param serverAddress {string}
     * @param port {number}
     */
    abstract setDC(dcId: number, serverAddress: string, port: number): void;

    /**
     * Returns the currently-used data center ID.
     */
    abstract get dcId(): number;

    /**
     * Returns the server address where the library should connect to.
     */
    abstract get serverAddress(): string;

    /**
     * Returns the port to which the library should connect to.
     */
    abstract get port(): number;

    /**
     * Whether this session is bound to Telegram's test environment.
     * Sessions are not portable between test and production.
     */
    private __testServers = false;
    get testServers(): boolean {
        return this.__testServers;
    }
    set testServers(value: boolean) {
        this.__testServers = value;
    }

    /**
     * Returns an ``AuthKey`` instance associated with the saved
     * data center, or `undefined` if a new one should be generated.
     */
    abstract get authKey(): AuthKey | undefined;

    /**
     * Sets the ``AuthKey`` to be used for the saved data center.
     * @param value
     */
    abstract set authKey(value: AuthKey | undefined);

    /**
     * Called before using the session
     */
    abstract load(): Promise<void>;

    /**
     *  sets auth key for a dc
     */
    abstract setAuthKey(authKey?: AuthKey, dcId?: number): void;

    /**
     *  gets auth key for a dc
     */

    abstract getAuthKey(dcId?: number): AuthKey | undefined;

    /**
     * Turns the given key into an ``InputPeer`` (e.g. ``InputPeerUser``).
     * The library uses this method whenever an ``InputPeer`` is needed
     * to suit several purposes (e.g. user only provided its ID or wishes
     * to use a cached username to avoid extra RPC).
     */
    abstract getInputEntity(key: EntityLike): Api.TypeInputPeer | Promise<Api.TypeInputPeer>;

    /**
     * Returns an ID of the takeout process initialized for this session,
     * or `None` if there's no were any unfinished takeout requests.
     */
    /*CONTEST
    get takeoutId() {
        throw new Error('Not Implemented')
    }
    */
    /**
     * Sets the ID of the unfinished takeout process for this session.
     * @param value
     */
    /*CONTEST
    set takeoutId(value) {
        throw new Error('Not Implemented')
    }
    */
    /**
     * Returns the update state saved by {@link setUpdateState}, if any.
     */
    getUpdateState(): StoredUpdateState | undefined {
        return undefined;
    }

    /**
     * Persists the update state (common pts/qts/date/seq and per-channel pts)
     * so the client can fetch updates missed while it was offline.
     */
    setUpdateState(_state: StoredUpdateState | undefined): void {}

    /**
     * Called on client disconnection. Should be used to
     * free any used resources. Can be left empty if none.
     */

    abstract close(): void;

    /**
     * called whenever important properties change. It should
     * make persist the relevant session information to disk.
     */
    abstract save(): void | string;

    /**
     * Called upon client.logOut(). Should delete the stored
     * information from disk since it's not valid anymore.
     */

    abstract delete(): void | Promise<void>;

    /**
     * Processes the input ``TLObject`` or ``list`` and saves
     * whatever information is relevant (e.g., ID or access hash).
     * May be asynchronous; the library awaits the result where possible,
     * and a storage failure never fails the request that produced it.
     * @param tlo
     */
    abstract processEntities(tlo: any): void | Promise<void>;
}
