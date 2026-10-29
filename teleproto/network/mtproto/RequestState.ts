import type bigInt from "big-integer";
import Deferred from "../../extensions/Deferred";
import type { Reader } from "../../tl/binary/Reader";
import { Api } from "../../tl";
import { Buffer } from "../../platform";

export type OutgoingObject =
    | Api.AnyRequest
    | Api.MsgsAck
    | Api.MsgsStateReq
    | Api.MsgsStateInfo
    | Api.MsgResendReq;

interface ResultReader {
    readResult(reader: Reader): unknown;
}

export function readResult(request: OutgoingObject, reader: Reader): unknown {
    return (request as unknown as ResultReader).readResult(reader);
}

export function expectsAnswer(request: OutgoingObject): request is Api.AnyRequest {
    return request.classType === "request";
}

export class RequestState<T = unknown> {
    request: OutgoingObject;
    data: Buffer;
    msgId?: bigInt.BigInteger;
    containerId?: bigInt.BigInteger;
    forcedMsgId?: bigInt.BigInteger;
    after?: RequestState;
    sentAt?: number;
    acknowledged = false;
    initWrapped = false;
    cancelled = false;
    readonly finished = new Deferred<void>();
    promise!: Promise<T>;
    resolve!: (value: T) => void;
    reject!: (reason: unknown) => void;
    private settled = true;

    constructor(request: OutgoingObject) {
        this.request = request;
        this.data = request.getBytes();
        this.resetPromise();
    }

    isReady(): Promise<void> {
        return this.after?.finished.promise ?? Promise.resolve();
    }

    resetPromise() {
        if (!this.settled) return;
        this.settled = false;
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolve = (value) => {
                this.settled = true;
                resolve(value);
            };
            this.reject = (reason) => {
                this.settled = true;
                reject(reason);
            };
        });
        this.promise.catch(() => {});
    }
}
