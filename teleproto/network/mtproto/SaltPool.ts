import type bigInt from "big-integer";
import type { Api } from "../../tl";

const VALIDITY_MARGIN_S = 60;
const REFILL_INTERVAL_MS = 60_000;

export interface FutureSalt {
    validSince: number;
    validUntil: number;
    salt: bigInt.BigInteger;
}

export class SaltPool {
    private salts: FutureSalt[] = [];
    private refilling = false;
    private refilledAt = 0;

    current(serverNow: number): bigInt.BigInteger | undefined {
        while (this.salts.length && this.salts[0].validUntil <= serverNow + VALIDITY_MARGIN_S) this.salts.shift();
        const first = this.salts[0];
        return first && first.validSince <= serverNow ? first.salt : undefined;
    }

    needsRefill(now = Date.now()): boolean {
        return this.salts.length <= 1 && !this.refilling && now - this.refilledAt >= REFILL_INTERVAL_MS;
    }

    beginRefill(now = Date.now()) {
        this.refilling = true;
        this.refilledAt = now;
    }

    endRefill(result?: Api.FutureSalts) {
        this.refilling = false;
        if (!result) return;
        this.salts = result.salts
            .map(({ validSince, validUntil, salt }) => ({ validSince, validUntil, salt }))
            .sort((a, b) => a.validSince - b.validSince);
    }

    get count() {
        return this.salts.length;
    }

    clear() {
        this.salts = [];
    }
}
