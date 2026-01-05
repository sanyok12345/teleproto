import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class RpcAnswerDroppedRunning extends TLObject {
    static CONSTRUCTOR_ID = 3447252358;
    static SUBCLASS_OF_ID = 1271559536;
    static className = "RpcAnswerDroppedRunning";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3447252358, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RpcAnswerDroppedRunning {
        const args: any = {};
        return new RpcAnswerDroppedRunning(args);
    }
}