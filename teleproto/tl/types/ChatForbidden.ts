import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatForbidden extends TLObject {
    static CONSTRUCTOR_ID = 1704108455;
    static SUBCLASS_OF_ID = 3316604308;
    static className = "ChatForbidden";
    static classType = "constructor";

    id!: bigint;
    title!: string;

    constructor(args: { id?: bigint, title?: string } = {}) {
        super();
        this.id = args.id!;
        this.title = args.title!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1704108455, false);
        writer.writeLargeInt(this.id, 64);
        writer.tgWriteString(this.title);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatForbidden {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _title = reader.tgReadString();
        args.title = _title;
        return new ChatForbidden(args);
    }
}