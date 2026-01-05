import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdateMonoForumNoPaidException extends TLObject {
    static CONSTRUCTOR_ID = 2676042504;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateMonoForumNoPaidException";
    static classType = "constructor";

    flags!: number;
    exception?: boolean;
    channelId!: bigint;
    savedPeerId!: TypePeer;

    constructor(args: { flags?: number, exception?: boolean, channelId?: bigint, savedPeerId?: TypePeer } = {}) {
        super();
        this.flags = args.flags!;
        this.exception = args.exception;
        this.channelId = args.channelId!;
        this.savedPeerId = args.savedPeerId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2676042504, false);
        let flags = 0;
        if (this.exception) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.exception !== undefined && this.exception !== null) {
        }
        writer.writeLargeInt(this.channelId, 64);
        writer.write(this.savedPeerId.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateMonoForumNoPaidException {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _exception = true;
            args.exception = _exception;
        } else {
            args.exception = false;
        }
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _savedPeerId = reader.tgReadObject();
        args.savedPeerId = _savedPeerId;
        return new UpdateMonoForumNoPaidException(args);
    }
}