import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionChatCreate extends TLObject {
    static CONSTRUCTOR_ID = 3175599021;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionChatCreate";
    static classType = "constructor";

    title!: string;
    users!: bigint[];

    constructor(args: { title?: string, users?: bigint[] } = {}) {
        super();
        this.title = args.title!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3175599021, false);
        writer.tgWriteString(this.title);
        writer.writeVector(this.users, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionChatCreate {
        const args: any = {};
        const _title = reader.tgReadString();
        args.title = _title;
        const _users = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.users = _users;
        return new MessageActionChatCreate(args);
    }
}