import bigInt from "big-integer";

const ID_BUFFER_SIZE = 400;

export type RegisterResult = "success" | "duplicate" | "tooOld";
export type LookupResult = "notFound" | "needsAck" | "noAckNeeded";

export class ReceivedIdsManager {
    private readonly ids: Array<{ msgId: bigInt.BigInteger; needAck: boolean }> = [];

    registerMsgId(msgId: bigInt.BigInteger, needAck: boolean): RegisterResult {
        const idx = this.indexOf(msgId);
        if (idx >= 0) return "duplicate";
        if (this.ids.length >= ID_BUFFER_SIZE && msgId.lesser(this.ids[0]!.msgId)) {
            return "tooOld";
        }
        const insertAt = this.lowerBound(msgId);
        this.ids.splice(insertAt, 0, { msgId, needAck });
        return "success";
    }

    lookup(msgId: bigInt.BigInteger): LookupResult {
        const idx = this.indexOf(msgId);
        if (idx < 0) return "notFound";
        return this.ids[idx]!.needAck ? "needsAck" : "noAckNeeded";
    }

    markAcked(msgId: bigInt.BigInteger): void {
        const idx = this.indexOf(msgId);
        if (idx >= 0) this.ids[idx]!.needAck = false;
    }

    min(): bigInt.BigInteger {
        return this.ids[0]?.msgId ?? bigInt.zero;
    }

    max(): bigInt.BigInteger {
        return this.ids[this.ids.length - 1]?.msgId ?? bigInt.zero;
    }

    shrink(): void {
        while (this.ids.length > ID_BUFFER_SIZE) this.ids.shift();
    }

    clear(): void {
        this.ids.length = 0;
    }

    get size(): number {
        return this.ids.length;
    }

    private lowerBound(msgId: bigInt.BigInteger): number {
        let lo = 0;
        let hi = this.ids.length;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (this.ids[mid]!.msgId.lesser(msgId)) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    private indexOf(msgId: bigInt.BigInteger): number {
        const idx = this.lowerBound(msgId);
        if (idx >= this.ids.length) return -1;
        return this.ids[idx]!.msgId.eq(msgId) ? idx : -1;
    }
}
