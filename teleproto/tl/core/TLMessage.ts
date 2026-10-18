import type bigInt from "big-integer";

export class TLMessage {
    static readonly SIZE_OVERHEAD = 12;
    static readonly classType = "constructor";
    readonly classType = "constructor";

    constructor(
        readonly msgId: bigInt.BigInteger,
        readonly seqNo: number,
        public obj: unknown
    ) { }
}
