import bigInt from "big-integer";
import Deferred from "../extensions/Deferred";
import { Api } from "../tl";

export class RequestState {
    public containerId?: bigInt.BigInteger;
    public msgId?: bigInt.BigInteger;
    public forcedMsgId?: bigInt.BigInteger;
    public request: any;
    public data: Buffer;
    public after: any;
    public finished: Deferred;
    public promise: Promise<unknown> | undefined;
    public acknowledged: boolean;
    // @ts-ignore
    public resolve: (value?: any) => void;
    // @ts-ignore
    public reject: (reason?: any) => void;
    private _settled = true;

    constructor(request: Api.AnyRequest | Api.MsgsAck | Api.MsgsStateInfo) {
        this.containerId = undefined;
        this.msgId = undefined;
        this.request = request;
        this.data = request.getBytes();
        this.after = undefined;
        this.acknowledged = false;
        this.finished = new Deferred();

        this.resetPromise();
    }

    isReady() {
        if (!this.after) {
            return true;
        }

        return this.after.finished.promise;
    }

    resetPromise() {
        if (this.promise && !this._settled) {
            return;
        }
        this._settled = false;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = (value?: any) => {
                this._settled = true;
                resolve(value);
            };
            this.reject = (reason?: any) => {
                this._settled = true;
                reject(reason);
            };
        });
    }
}
