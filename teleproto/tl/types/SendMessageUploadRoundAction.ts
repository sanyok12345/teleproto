import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SendMessageUploadRoundAction extends TLObject {
    static CONSTRUCTOR_ID = 608050278;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageUploadRoundAction";
    static classType = "constructor";

    progress!: number;

    constructor(args: { progress?: number } = {}) {
        super();
        this.progress = args.progress!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(608050278, false);
        writer.writeInt(this.progress);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageUploadRoundAction {
        const args: any = {};
        const _progress = reader.readInt();
        args.progress = _progress;
        return new SendMessageUploadRoundAction(args);
    }
}