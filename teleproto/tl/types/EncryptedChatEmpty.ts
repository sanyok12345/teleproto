import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EncryptedChatEmpty extends TLObject {
    static CONSTRUCTOR_ID = 2877210784;
    static SUBCLASS_OF_ID = 1831379834;
    static className = "EncryptedChatEmpty";
    static classType = "constructor";

    id!: number;

    constructor(args: { id?: number } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2877210784, false);
        writer.writeInt(this.id);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EncryptedChatEmpty {
        const args: any = {};
        const _id = reader.readInt();
        args.id = _id;
        return new EncryptedChatEmpty(args);
    }
}