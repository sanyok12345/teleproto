import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatAdminRights } from "./TypeChatAdminRights";

export class ChannelParticipantCreator extends TLObject {
    static CONSTRUCTOR_ID = 803602899;
    static SUBCLASS_OF_ID = 3653762072;
    static className = "ChannelParticipantCreator";
    static classType = "constructor";

    flags!: number;
    userId!: bigint;
    adminRights!: TypeChatAdminRights;
    rank?: string;

    constructor(args: { flags?: number, userId?: bigint, adminRights?: TypeChatAdminRights, rank?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.userId = args.userId!;
        this.adminRights = args.adminRights!;
        this.rank = args.rank;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(803602899, false);
        let flags = 0;
        if (this.rank !== undefined && this.rank !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.userId, 64);
        writer.write(this.adminRights.getBytes());
        if (this.rank !== undefined && this.rank !== null) {
            writer.tgWriteString(this.rank);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipantCreator {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _adminRights = reader.tgReadObject();
        args.adminRights = _adminRights;
        if (args.flags & (1 << 0)) {
            const _rank = reader.tgReadString();
            args.rank = _rank;
        } else {
            args.rank = undefined;
        }
        return new ChannelParticipantCreator(args);
    }
}