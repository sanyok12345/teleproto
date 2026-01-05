import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class KeyboardButtonUserProfile extends TLObject {
    static CONSTRUCTOR_ID = 814112961;
    static SUBCLASS_OF_ID = 195916963;
    static className = "KeyboardButtonUserProfile";
    static classType = "constructor";

    text!: string;
    userId!: bigint;

    constructor(args: { text?: string, userId?: bigint } = {}) {
        super();
        this.text = args.text!;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(814112961, false);
        writer.tgWriteString(this.text);
        writer.writeLargeInt(this.userId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButtonUserProfile {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        return new KeyboardButtonUserProfile(args);
    }
}