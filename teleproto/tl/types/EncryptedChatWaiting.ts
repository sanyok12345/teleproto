import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EncryptedChatWaiting extends TLObject {
    static CONSTRUCTOR_ID = 1722964307;
    static SUBCLASS_OF_ID = 1831379834;
    static className = "EncryptedChatWaiting";
    static classType = "constructor";

    id!: number;
    accessHash!: bigint;
    date!: number;
    adminId!: bigint;
    participantId!: bigint;

    constructor(args: { id?: number, accessHash?: bigint, date?: number, adminId?: bigint, participantId?: bigint } = {}) {
        super();
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.date = args.date!;
        this.adminId = args.adminId!;
        this.participantId = args.participantId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1722964307, false);
        writer.writeInt(this.id);
        writer.writeLargeInt(this.accessHash, 64);
        writer.writeInt(this.date);
        writer.writeLargeInt(this.adminId, 64);
        writer.writeLargeInt(this.participantId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EncryptedChatWaiting {
        const args: any = {};
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
        return new EncryptedChatWaiting(args);
    }
}