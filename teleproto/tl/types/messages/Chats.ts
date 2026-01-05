import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeChat } from "../TypeChat";

export class Chats extends TLObject {
    static CONSTRUCTOR_ID = 1694474197;
    static SUBCLASS_OF_ID = 2580925204;
    static className = "messages.Chats";
    static classType = "constructor";

    chats!: TypeChat[];

    constructor(args: { chats?: TypeChat[] } = {}) {
        super();
        this.chats = args.chats!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1694474197, false);
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Chats {
        const args: any = {};
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        return new Chats(args);
    }
}