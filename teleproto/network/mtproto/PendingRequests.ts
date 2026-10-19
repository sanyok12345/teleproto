import type bigInt from "big-integer";
import type { RequestState } from "./RequestState";

export class PendingRequests {
    private readonly byId = new Map<string, RequestState>();

    get size() {
        return this.byId.size;
    }

    add(state: RequestState) {
        if (state.msgId) this.byId.set(state.msgId.toString(), state);
    }

    get(msgId: bigInt.BigInteger) {
        return this.byId.get(msgId.toString());
    }

    take(msgId: bigInt.BigInteger) {
        const key = msgId.toString();
        const state = this.byId.get(key);
        this.byId.delete(key);
        return state;
    }

    takeMessage(msgId: bigInt.BigInteger): RequestState[] {
        const state = this.take(msgId);
        if (state) return [state];
        const inContainer = this.values().filter((pending) => pending.containerId?.equals(msgId));
        for (const pending of inContainer) this.take(pending.msgId!);
        return inContainer;
    }

    delete(msgId: bigInt.BigInteger) {
        this.byId.delete(msgId.toString());
    }

    values(): RequestState[] {
        return [...this.byId.values()];
    }

    clear() {
        this.byId.clear();
    }
}
