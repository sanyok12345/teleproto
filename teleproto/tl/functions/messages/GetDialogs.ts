import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeDialogs } from "../../types/messages/TypeDialogs";

export class GetDialogs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2700397391;
    static SUBCLASS_OF_ID = 236671726;
    static className = "messages.GetDialogs";
    static classType = "request";

    flags?: number;
    excludePinned?: boolean;
    folderId?: number;
    offsetDate!: number;
    offsetId!: number;
    offsetPeer!: EntityLike;
    limit!: number;
    hash?: bigint;

    constructor(args: { flags?: number, excludePinned?: boolean, folderId?: number, offsetDate?: number, offsetId?: number, offsetPeer?: EntityLike, limit?: number, hash?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.excludePinned = args.excludePinned;
        this.folderId = args.folderId;
        this.offsetDate = args.offsetDate!;
        this.offsetId = args.offsetId!;
        this.offsetPeer = args.offsetPeer!;
        this.limit = args.limit!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2700397391, false);
        let flags = 0;
        if (this.excludePinned) { flags |= 1 << 0; }
        if (this.folderId !== undefined && this.folderId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.excludePinned !== undefined && this.excludePinned !== null) {
        }
        if (this.folderId !== undefined && this.folderId !== null) {
            writer.writeInt(this.folderId);
        }
        writer.writeInt(this.offsetDate);
        writer.writeInt(this.offsetId);
        writer.write((this.offsetPeer as any).getBytes());
        writer.writeInt(this.limit);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDialogs {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetDialogs {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _excludePinned = true;
            args.excludePinned = _excludePinned;
        } else {
            args.excludePinned = false;
        }
        if (args.flags & (1 << 1)) {
            const _folderId = reader.readInt();
            args.folderId = _folderId;
        } else {
            args.folderId = undefined;
        }
        const _offsetDate = reader.readInt();
        args.offsetDate = _offsetDate;
        const _offsetId = reader.readInt();
        args.offsetId = _offsetId;
        const _offsetPeer = reader.tgReadObject();
        args.offsetPeer = _offsetPeer;
        const _limit = reader.readInt();
        args.limit = _limit;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetDialogs(args);
    }
}