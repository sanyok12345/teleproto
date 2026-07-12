import bigInt from "big-integer";
import { AuthKey } from "../crypto/AuthKey";

export class Dcenter {
    readonly dcId: number;
    readonly authKey: AuthKey;
    private _salt: bigInt.BigInteger;

    mediaTempFailed = false;

    constructor(dcId: number, authKey?: AuthKey) {
        this.dcId = dcId;
        this.authKey = authKey ?? new AuthKey();
        this._salt = bigInt.zero;
    }

    get mediaTempUsable(): boolean {
        return !this.mediaTempFailed;
    }

    get salt(): bigInt.BigInteger {
        return this._salt;
    }

    updateSalt(salt: bigInt.BigInteger | undefined | null): void {
        if (salt && !salt.isZero()) {
            this._salt = salt;
        }
    }
}

export class DcenterRegistry {
    private readonly _dcs = new Map<number, Dcenter>();

    get(dcId: number, seedKey?: AuthKey): Dcenter {
        let dc = this._dcs.get(dcId);
        if (!dc) {
            dc = new Dcenter(dcId, seedKey);
            this._dcs.set(dcId, dc);
        }
        return dc;
    }

    clear(): void {
        this._dcs.clear();
    }
}
