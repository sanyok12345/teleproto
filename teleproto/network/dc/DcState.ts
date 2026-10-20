import bigInt from "big-integer";
import { AuthKey } from "../../crypto/AuthKey";
import { SaltPool } from "../mtproto/SaltPool";
import { ConnectThrottle } from "../session/ConnectThrottle";

export class DcState {
    readonly authKey: AuthKey;
    readonly salts = new SaltPool();
    readonly throttle = new ConnectThrottle();
    readonly mediaThrottle = new ConnectThrottle();
    salt = bigInt.zero;
    authorized: boolean;
    private importing?: Promise<void>;
    pfsFailed = false;

    constructor(
        readonly dcId: number,
        authKey?: AuthKey
    ) {
        this.authKey = authKey ?? new AuthKey();
        this.authorized = !!this.authKey.getKey();
    }

    updateSalt(salt: bigInt.BigInteger | undefined) {
        if (salt && !salt.isZero()) this.salt = salt;
    }

    unauthorize() {
        this.authorized = false;
    }

    authorize(importAuthorization: () => Promise<void>): Promise<void> {
        if (this.authorized) return Promise.resolve();
        this.importing ??= importAuthorization()
            .then(() => {
                this.authorized = true;
            })
            .finally(() => {
                this.importing = undefined;
            });
        return this.importing;
    }
}

export class DcStateRegistry {
    private readonly states = new Map<number, DcState>();

    get(dcId: number, seedKey?: AuthKey): DcState {
        let state = this.states.get(dcId);
        if (!state) {
            state = new DcState(dcId, seedKey);
            this.states.set(dcId, state);
        }
        return state;
    }

    clear() {
        this.states.clear();
    }
}
