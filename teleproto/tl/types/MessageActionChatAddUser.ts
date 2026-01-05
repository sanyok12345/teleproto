import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionChatAddUser extends TLObject {
    static CONSTRUCTOR_ID = 365886720;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionChatAddUser";
    static classType = "constructor";

    users!: bigint[];

    constructor(args: { users?: bigint[] } = {}) {
        super();
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(365886720, false);
        writer.writeVector(this.users, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionChatAddUser {
        const args: any = {};
        const _users = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.users = _users;
        return new MessageActionChatAddUser(args);
    }
}