import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGeoPoint } from "./TypeGeoPoint";
import { MessageIDLike } from "./../../define";

export class UpdateBotInlineSend extends TLObject {
    static CONSTRUCTOR_ID = 317794823;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotInlineSend";
    static classType = "constructor";

    flags!: number;
    userId!: bigint;
    query!: string;
    geo?: TypeGeoPoint;
    id!: string;
    msgId?: MessageIDLike;

    constructor(args: { flags?: number, userId?: bigint, query?: string, geo?: TypeGeoPoint, id?: string, msgId?: MessageIDLike } = {}) {
        super();
        this.flags = args.flags!;
        this.userId = args.userId!;
        this.query = args.query!;
        this.geo = args.geo;
        this.id = args.id!;
        this.msgId = args.msgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(317794823, false);
        let flags = 0;
        if (this.geo !== undefined && this.geo !== null) { flags |= 1 << 0; }
        if (this.msgId !== undefined && this.msgId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.userId, 64);
        writer.tgWriteString(this.query);
        if (this.geo !== undefined && this.geo !== null) {
            writer.write(this.geo.getBytes());
        }
        writer.tgWriteString(this.id);
        if (this.msgId !== undefined && this.msgId !== null) {
            if (typeof this.msgId === 'number') {
                writer.writeInt(this.msgId);
            } else {
                writer.writeInt((this.msgId as any).id);
            }
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotInlineSend {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _query = reader.tgReadString();
        args.query = _query;
        if (args.flags & (1 << 0)) {
            const _geo = reader.tgReadObject();
            args.geo = _geo;
        } else {
            args.geo = undefined;
        }
        const _id = reader.tgReadString();
        args.id = _id;
        if (args.flags & (1 << 1)) {
            const _msgId = reader.tgReadObject();
            args.msgId = _msgId;
        } else {
            args.msgId = undefined;
        }
        return new UpdateBotInlineSend(args);
    }
}