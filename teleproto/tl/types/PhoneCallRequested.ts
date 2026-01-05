import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoneCallProtocol } from "./TypePhoneCallProtocol";

export class PhoneCallRequested extends TLObject {
    static CONSTRUCTOR_ID = 347139340;
    static SUBCLASS_OF_ID = 3296664529;
    static className = "PhoneCallRequested";
    static classType = "constructor";

    flags!: number;
    video?: boolean;
    id!: bigint;
    accessHash!: bigint;
    date!: number;
    adminId!: bigint;
    participantId!: bigint;
    gAHash!: Buffer;
    protocol!: TypePhoneCallProtocol;

    constructor(args: { flags?: number, video?: boolean, id?: bigint, accessHash?: bigint, date?: number, adminId?: bigint, participantId?: bigint, gAHash?: Buffer, protocol?: TypePhoneCallProtocol } = {}) {
        super();
        this.flags = args.flags!;
        this.video = args.video;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.date = args.date!;
        this.adminId = args.adminId!;
        this.participantId = args.participantId!;
        this.gAHash = args.gAHash!;
        this.protocol = args.protocol!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(347139340, false);
        let flags = 0;
        if (this.video) { flags |= 1 << 6; }
        writer.writeInt(flags, false);
        if (this.video !== undefined && this.video !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.writeInt(this.date);
        writer.writeLargeInt(this.adminId, 64);
        writer.writeLargeInt(this.participantId, 64);
        writer.tgWriteBytes(this.gAHash);
        writer.write(this.protocol.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneCallRequested {
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
        const _gAHash = reader.tgReadBytes();
        args.gAHash = _gAHash;
        const _protocol = reader.tgReadObject();
        args.protocol = _protocol;
        return new PhoneCallRequested(args);
    }
}