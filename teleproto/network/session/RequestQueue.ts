import { Api } from "../../tl";
import type { RequestState } from "../mtproto/RequestState";

const ORDERED_REQUESTS = new Set([
    "messages.SendMessage",
    "messages.SendMedia",
    "messages.SendMultiMedia",
    "messages.ForwardMessages",
    "messages.SendInlineBotResult",
]);

export class RequestQueue {
    readonly requests: RequestState[] = [];
    readonly service: RequestState[] = [];
    private readonly serviceStates = new WeakSet<RequestState>();
    private wake?: () => void;

    get size() {
        return this.requests.length + this.service.length;
    }

    isService(state: RequestState) {
        return this.serviceStates.has(state);
    }

    push(state: RequestState) {
        if (ORDERED_REQUESTS.has(state.request.className)) {
            for (let i = this.requests.length - 1; i >= 0; i--) {
                if (ORDERED_REQUESTS.has(this.requests[i].request.className)) {
                    state.after = this.requests[i];
                    break;
                }
            }
        }
        this.requests.push(state);
        this.notify();
    }

    pushService(state: RequestState) {
        this.serviceStates.add(state);
        this.service.push(state);
        this.notify();
    }

    requeue(states: RequestState[]) {
        const requests: RequestState[] = [];
        const service: RequestState[] = [];
        for (const state of states) {
            if (state.cancelled) continue;
            state.msgId = undefined;
            state.containerId = undefined;
            (this.isService(state) ? service : requests).push(state);
        }
        this.service.unshift(...service);
        this.requests.unshift(...requests);
        this.notify();
    }

    remove(state: RequestState) {
        const index = this.requests.indexOf(state);
        if (index >= 0) this.requests.splice(index, 1);
    }

    next(includeRequests: boolean): RequestState[] | undefined {
        if (this.service.length) return this.service;
        if (includeRequests && this.requests.length) return this.requests;
        return undefined;
    }

    waitForWork(): Promise<void> {
        return new Promise((resolve) => {
            this.wake = resolve;
        });
    }

    notify() {
        const wake = this.wake;
        this.wake = undefined;
        wake?.();
    }

    rejectAll(error: Error) {
        for (const state of [...this.requests, ...this.service]) {
            if (!(state.request instanceof Api.MsgsAck)) state.reject(error);
        }
        this.requests.length = 0;
        this.service.length = 0;
    }
}
