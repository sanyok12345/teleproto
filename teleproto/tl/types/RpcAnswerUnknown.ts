import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class RpcAnswerUnknown extends TLObject {
    static CONSTRUCTOR_ID = 1579864942;
    static SUBCLASS_OF_ID = 1271559536;
    static className = "RpcAnswerUnknown";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1579864942, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RpcAnswerUnknown {
        const args: any = {};
        return new RpcAnswerUnknown(args);
    }
}