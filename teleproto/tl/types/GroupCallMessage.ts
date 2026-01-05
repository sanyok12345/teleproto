import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class GroupCallMessage extends TLObject {
    static CONSTRUCTOR_ID = 445316222;
    static SUBCLASS_OF_ID = 1624136226;
    static className = "GroupCallMessage";
    static classType = "constructor";

    flags!: number;
    fromAdmin?: boolean;
    id!: number;
    fromId!: TypePeer;
    date!: number;
    message!: TypeTextWithEntities;
    paidMessageStars?: bigint;

    constructor(args: { flags?: number, fromAdmin?: boolean, id?: number, fromId?: TypePeer, date?: number, message?: TypeTextWithEntities, paidMessageStars?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.fromAdmin = args.fromAdmin;
        this.id = args.id!;
        this.fromId = args.fromId!;
        this.date = args.date!;
        this.message = args.message!;
        this.paidMessageStars = args.paidMessageStars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(445316222, false);
        let flags = 0;
        if (this.fromAdmin) { flags |= 1 << 1; }
        if (this.paidMessageStars !== undefined && this.paidMessageStars !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.fromAdmin !== undefined && this.fromAdmin !== null) {
        }
        writer.writeInt(this.id);
        writer.write(this.fromId.getBytes());
        writer.writeInt(this.date);
        writer.write(this.message.getBytes());
        if (this.paidMessageStars !== undefined && this.paidMessageStars !== null) {
            writer.writeLargeInt(this.paidMessageStars, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GroupCallMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _fromAdmin = true;
            args.fromAdmin = _fromAdmin;
        } else {
            args.fromAdmin = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        const _fromId = reader.tgReadObject();
        args.fromId = _fromId;
        const _date = reader.readInt();
        args.date = _date;
        const _message = reader.tgReadObject();
        args.message = _message;
        if (args.flags & (1 << 0)) {
            const _paidMessageStars = reader.readLargeInt(64);
            args.paidMessageStars = _paidMessageStars;
        } else {
            args.paidMessageStars = undefined;
        }
        return new GroupCallMessage(args);
    }
}