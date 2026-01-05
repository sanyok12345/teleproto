import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoneCallProtocol } from "./TypePhoneCallProtocol";

export class PhoneCallWaiting extends TLObject {
    static CONSTRUCTOR_ID = 3307368215;
    static SUBCLASS_OF_ID = 3296664529;
    static className = "PhoneCallWaiting";
    static classType = "constructor";

    flags!: number;
    video?: boolean;
    id!: bigint;
    accessHash!: bigint;
    date!: number;
    adminId!: bigint;
    participantId!: bigint;
    protocol!: TypePhoneCallProtocol;
    receiveDate?: number;

    constructor(args: { flags?: number, video?: boolean, id?: bigint, accessHash?: bigint, date?: number, adminId?: bigint, participantId?: bigint, protocol?: TypePhoneCallProtocol, receiveDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.video = args.video;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.date = args.date!;
        this.adminId = args.adminId!;
        this.participantId = args.participantId!;
        this.protocol = args.protocol!;
        this.receiveDate = args.receiveDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3307368215, false);
        let flags = 0;
        if (this.video) { flags |= 1 << 6; }
        if (this.receiveDate !== undefined && this.receiveDate !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.video !== undefined && this.video !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.writeInt(this.date);
        writer.writeLargeInt(this.adminId, 64);
        writer.writeLargeInt(this.participantId, 64);
        writer.write(this.protocol.getBytes());
        if (this.receiveDate !== undefined && this.receiveDate !== null) {
            writer.writeInt(this.receiveDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneCallWaiting {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 6)) {
            const _video = true;
            args.video = _video;
        } else {
            args.video = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _date = reader.readInt();
        args.date = _date;
        const _adminId = reader.readLargeInt(64);
        args.adminId = _adminId;
        const _participantId = reader.readLargeInt(64);
        args.participantId = _participantId;
        const _protocol = reader.tgReadObject();
        args.protocol = _protocol;
        if (args.flags & (1 << 0)) {
            const _receiveDate = reader.readInt();
            args.receiveDate = _receiveDate;
        } else {
            args.receiveDate = undefined;
        }
        return new PhoneCallWaiting(args);
    }
}