import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeUser } from "../TypeUser";

export class PopularAppBots extends TLObject {
    static CONSTRUCTOR_ID = 428978491;
    static SUBCLASS_OF_ID = 2070199933;
    static className = "bots.PopularAppBots";
    static classType = "constructor";

    flags!: number;
    nextOffset?: string;
    users!: TypeUser[];

    constructor(args: { flags?: number, nextOffset?: string, users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.nextOffset = args.nextOffset;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(428978491, false);
        let flags = 0;
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.nextOffset !== undefined && this.nextOffset !== null) {
            writer.tgWriteString(this.nextOffset);
        }
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PopularAppBots {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _nextOffset = reader.tgReadString();
            args.nextOffset = _nextOffset;
        } else {
            args.nextOffset = undefined;
        }
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new PopularAppBots(args);
    }
}