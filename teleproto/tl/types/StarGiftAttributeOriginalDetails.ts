import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class StarGiftAttributeOriginalDetails extends TLObject {
    static CONSTRUCTOR_ID = 3770675820;
    static SUBCLASS_OF_ID = 2276819400;
    static className = "StarGiftAttributeOriginalDetails";
    static classType = "constructor";

    flags!: number;
    senderId?: TypePeer;
    recipientId!: TypePeer;
    date!: number;
    message?: TypeTextWithEntities;

    constructor(args: { flags?: number, senderId?: TypePeer, recipientId?: TypePeer, date?: number, message?: TypeTextWithEntities } = {}) {
        super();
        this.flags = args.flags!;
        this.senderId = args.senderId;
        this.recipientId = args.recipientId!;
        this.date = args.date!;
        this.message = args.message;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3770675820, false);
        let flags = 0;
        if (this.senderId !== undefined && this.senderId !== null) { flags |= 1 << 0; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.senderId !== undefined && this.senderId !== null) {
            writer.write(this.senderId.getBytes());
        }
        writer.write(this.recipientId.getBytes());
        writer.writeInt(this.date);
        if (this.message !== undefined && this.message !== null) {
            writer.write(this.message.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAttributeOriginalDetails {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _senderId = reader.tgReadObject();
            args.senderId = _senderId;
        } else {
            args.senderId = undefined;
        }
        const _recipientId = reader.tgReadObject();
        args.recipientId = _recipientId;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 1)) {
            const _message = reader.tgReadObject();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        return new StarGiftAttributeOriginalDetails(args);
    }
}