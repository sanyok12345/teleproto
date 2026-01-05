import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyValueAllowChatParticipants extends TLObject {
    static CONSTRUCTOR_ID = 1796427406;
    static SUBCLASS_OF_ID = 3954700912;
    static className = "PrivacyValueAllowChatParticipants";
    static classType = "constructor";

    chats!: bigint[];

    constructor(args: { chats?: bigint[] } = {}) {
        super();
        this.chats = args.chats!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1796427406, false);
        writer.writeVector(this.chats, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyValueAllowChatParticipants {
        const args: any = {};
        const _chats = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.chats = _chats;
        return new PrivacyValueAllowChatParticipants(args);
    }
}