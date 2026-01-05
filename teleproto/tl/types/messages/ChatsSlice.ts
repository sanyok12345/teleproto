import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeChat } from "../TypeChat";

export class ChatsSlice extends TLObject {
    static CONSTRUCTOR_ID = 2631405892;
    static SUBCLASS_OF_ID = 2580925204;
    static className = "messages.ChatsSlice";
    static classType = "constructor";

    count!: number;
    chats!: TypeChat[];

    constructor(args: { count?: number, chats?: TypeChat[] } = {}) {
        super();
        this.count = args.count!;
        this.chats = args.chats!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2631405892, false);
        writer.writeInt(this.count);
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatsSlice {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        return new ChatsSlice(args);
    }
}