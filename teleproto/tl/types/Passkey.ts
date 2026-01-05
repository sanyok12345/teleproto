import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class Passkey extends TLObject {
    static CONSTRUCTOR_ID = 2556509887;
    static SUBCLASS_OF_ID = 3476557280;
    static className = "Passkey";
    static classType = "constructor";

    flags!: number;
    id!: string;
    name!: string;
    date!: number;
    softwareEmojiId?: bigint;
    lastUsageDate?: number;

    constructor(args: { flags?: number, id?: string, name?: string, date?: number, softwareEmojiId?: bigint, lastUsageDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.id = args.id!;
        this.name = args.name!;
        this.date = args.date!;
        this.softwareEmojiId = args.softwareEmojiId;
        this.lastUsageDate = args.lastUsageDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2556509887, false);
        let flags = 0;
        if (this.softwareEmojiId !== undefined && this.softwareEmojiId !== null) { flags |= 1 << 0; }
        if (this.lastUsageDate !== undefined && this.lastUsageDate !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.id);
        writer.tgWriteString(this.name);
        writer.writeInt(this.date);
        if (this.softwareEmojiId !== undefined && this.softwareEmojiId !== null) {
            writer.writeLargeInt(this.softwareEmojiId, 64);
        }
        if (this.lastUsageDate !== undefined && this.lastUsageDate !== null) {
            writer.writeInt(this.lastUsageDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Passkey {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _id = reader.tgReadString();
        args.id = _id;
        const _name = reader.tgReadString();
        args.name = _name;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 0)) {
            const _softwareEmojiId = reader.readLargeInt(64);
            args.softwareEmojiId = _softwareEmojiId;
        } else {
            args.softwareEmojiId = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _lastUsageDate = reader.readInt();
            args.lastUsageDate = _lastUsageDate;
        } else {
            args.lastUsageDate = undefined;
        }
        return new Passkey(args);
    }
}