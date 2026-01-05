import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStarGift } from "../TypeStarGift";
import { TypeStarGiftAttribute } from "../TypeStarGiftAttribute";
import { TypeChat } from "../TypeChat";
import { TypeStarGiftAttributeCounter } from "../TypeStarGiftAttributeCounter";
import { TypeUser } from "../TypeUser";

export class ResaleStarGifts extends TLObject {
    static CONSTRUCTOR_ID = 2491028191;
    static SUBCLASS_OF_ID = 3000743907;
    static className = "payments.ResaleStarGifts";
    static classType = "constructor";

    flags!: number;
    count!: number;
    gifts!: TypeStarGift[];
    nextOffset?: string;
    attributes?: TypeStarGiftAttribute[];
    attributesHash?: bigint;
    chats!: TypeChat[];
    counters?: TypeStarGiftAttributeCounter[];
    users!: TypeUser[];

    constructor(args: { flags?: number, count?: number, gifts?: TypeStarGift[], nextOffset?: string, attributes?: TypeStarGiftAttribute[], attributesHash?: bigint, chats?: TypeChat[], counters?: TypeStarGiftAttributeCounter[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.count = args.count!;
        this.gifts = args.gifts!;
        this.nextOffset = args.nextOffset;
        this.attributes = args.attributes;
        this.attributesHash = args.attributesHash;
        this.chats = args.chats!;
        this.counters = args.counters;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2491028191, false);
        let flags = 0;
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        if (this.attributes !== undefined && this.attributes !== null) { flags |= 1 << 1; }
        if (this.attributesHash !== undefined && this.attributesHash !== null) { flags |= 1 << 1; }
        if (this.counters !== undefined && this.counters !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.writeInt(this.count);
        writer.writeVector(this.gifts, (item) => {
            writer.write(item.getBytes());
        });
        if (this.nextOffset !== undefined && this.nextOffset !== null) {
            writer.tgWriteString(this.nextOffset);
        }
        if (this.attributes !== undefined && this.attributes !== null) {
            writer.writeVector(this.attributes, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.attributesHash !== undefined && this.attributesHash !== null) {
            writer.writeLargeInt(this.attributesHash, 64);
        }
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        if (this.counters !== undefined && this.counters !== null) {
            writer.writeVector(this.counters, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ResaleStarGifts {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _count = reader.readInt();
        args.count = _count;
        const _gifts = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.gifts = _gifts;
        if (args.flags & (1 << 0)) {
            const _nextOffset = reader.tgReadString();
            args.nextOffset = _nextOffset;
        } else {
            args.nextOffset = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _attributes = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.attributes = _attributes;
        } else {
            args.attributes = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _attributesHash = reader.readLargeInt(64);
            args.attributesHash = _attributesHash;
        } else {
            args.attributesHash = undefined;
        }
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        if (args.flags & (1 << 2)) {
            const _counters = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.counters = _counters;
        } else {
            args.counters = undefined;
        }
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new ResaleStarGifts(args);
    }
}