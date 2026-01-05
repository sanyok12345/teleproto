import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SendMessageUploadVideoAction extends TLObject {
    static CONSTRUCTOR_ID = 3916839660;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageUploadVideoAction";
    static classType = "constructor";

    progress!: number;

    constructor(args: { progress?: number } = {}) {
        super();
        this.progress = args.progress!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3916839660, false);
        writer.writeInt(this.progress);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageUploadVideoAction {
        const args: any = {};
        const _progress = reader.readInt();
        args.progress = _progress;
        return new SendMessageUploadVideoAction(args);
    }
}