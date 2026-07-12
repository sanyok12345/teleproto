import bigInt from "big-integer";

const ID_BUFFER_SIZE = 400;

export type RegisterResult = "success" | "duplicate" | "tooOld";

export class ReceivedIdsManager {
    private readonly ids: bigInt.BigInteger[] = [];

    registerMsgId(msgId: bigInt.BigInteger): RegisterResult {
        const idx = this.lowerBound(msgId);
        if (idx < this.ids.length && this.ids[idx]!.eq(msgId)) {
            return "duplicate";
        }
        if (this.ids.length >= ID_BUFFER_SIZE && msgId.lesser(this.ids[0]!)) {
            return "tooOld";
        }
        this.ids.splice(idx, 0, msgId);
        return "success";
    }

    shrink(): void {
        while (this.ids.length > ID_BUFFER_SIZE) this.ids.shift();
    }

    clear(): void {
        this.ids.length = 0;
    }

    private lowerBound(msgId: bigInt.BigInteger): number {
        let lo = 0;
        let hi = this.ids.length;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (this.ids[mid]!.lesser(msgId)) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
