export class MTProtoRequest<R = any> {
    private sent: boolean;
    private sequence: number;
    private _msgId: number;
    private readonly dirty: boolean;
    private sendTime: number;
    private confirmReceived: boolean;
    private constructorId: number;
    private readonly _confirmed: boolean;
    private responded: boolean;

    // These are added to satisfy the interface expected by the generated code and usages
    public className: string = "MTProtoRequest";
    public classType: string = "request";
    public SUBCLASS_OF_ID: number = 0;
    public __response!: R;

    constructor() {
        this.sent = false;
        this._msgId = 0; // long
        this.sequence = 0;

        this.dirty = false;
        this.sendTime = 0;
        this.confirmReceived = false;

        // These should be overrode

        this.constructorId = 0;
        this._confirmed = false;
        this.responded = false;
    }

    getBytes(): Buffer {
        throw new Error("getBytes not implemented in base MTProtoRequest");
    }

    // these should not be overrode
    onSendSuccess() {
        this.sendTime = new Date().getTime();
        this.sent = true;
    }

    onConfirm() {
        this.confirmReceived = true;
    }

    needResend() {
        return (
            this.dirty ||
            (this._confirmed &&
                !this.confirmReceived &&
                new Date().getTime() - this.sendTime > 3000)
        );
    }

    // These should be overrode
    onSend() {
        throw Error("Not overload " + this.constructor.name);
    }

    onResponse(buffer: Buffer) {}

    onException(exception: Error) {}

    // Stub for resolve method used by some requests
    async resolve(client: any, utils: any): Promise<void> {}
}
