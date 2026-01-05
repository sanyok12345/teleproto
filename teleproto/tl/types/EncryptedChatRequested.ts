import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EncryptedChatRequested extends TLObject {
    static CONSTRUCTOR_ID = 1223809356;
    static SUBCLASS_OF_ID = 1831379834;
    static className = "EncryptedChatRequested";
    static classType = "constructor";

    flags!: number;
    folderId?: number;
    id!: number;
    accessHash!: bigint;
    date!: number;
    adminId!: bigint;
    participantId!: bigint;
    gA!: Buffer;

    constructor(args: { flags?: number, folderId?: number, id?: number, accessHash?: bigint, date?: number, adminId?: bigint, participantId?: bigint, gA?: Buffer } = {}) {
        super();
        this.flags = args.flags!;
        this.folderId = args.folderId;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.date = args.date!;
        this.adminId = args.adminId!;
        this.participantId = args.participantId!;
        this.gA = args.gA!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1223809356, false);
        let flags = 0;
        if (this.folderId !== undefined && this.folderId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.folderId !== undefined && this.folderId !== null) {
            writer.writeInt(this.folderId);
        }
        writer.writeInt(this.id);
        writer.writeLargeInt(this.accessHash, 64);
        writer.writeInt(this.date);
        writer.writeLargeInt(this.adminId, 64);
        writer.writeLargeInt(this.participantId, 64);
        writer.tgWriteBytes(this.gA);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EncryptedChatRequested {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _folderId = reader.readInt();
            args.folderId = _folderId;
        } else {
            args.folderId = undefined;
        }
        const _id = reader.readInt();
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _date = reader.readInt();
        args.date = _date;
        const _adminId = reader.readLargeInt(64);
        args.adminId = _adminId;
        const _participantId = reader.readLargeInt(64);
        args.participantId = _participantId;
        const _gA = reader.tgReadBytes();
        args.gA = _gA;
        return new EncryptedChatRequested(args);
    }
}