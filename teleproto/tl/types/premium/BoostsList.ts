import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeBoost } from "../TypeBoost";
import { TypeUser } from "../TypeUser";

export class BoostsList extends TLObject {
    static CONSTRUCTOR_ID = 2264424764;
    static SUBCLASS_OF_ID = 573941949;
    static className = "premium.BoostsList";
    static classType = "constructor";

    flags!: number;
    count!: number;
    boosts!: TypeBoost[];
    nextOffset?: string;
    users!: TypeUser[];

    constructor(args: { flags?: number, count?: number, boosts?: TypeBoost[], nextOffset?: string, users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.count = args.count!;
        this.boosts = args.boosts!;
        this.nextOffset = args.nextOffset;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2264424764, false);
        let flags = 0;
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.count);
        writer.writeVector(this.boosts, (item) => {
            writer.write(item.getBytes());
        });
        if (this.nextOffset !== undefined && this.nextOffset !== null) {
            writer.tgWriteString(this.nextOffset);
        }
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BoostsList {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _count = reader.readInt();
        args.count = _count;
        const _boosts = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.boosts = _boosts;
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
        return new BoostsList(args);
    }
}