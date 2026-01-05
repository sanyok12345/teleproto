import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeMessagesFilter } from "../../types/TypeMessagesFilter";
import { EntityLike } from "../../types/../../define";
import { TypeMessages } from "../../types/messages/TypeMessages";

export class SearchGlobal extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1271290010;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.SearchGlobal";
    static classType = "request";

    flags?: number;
    broadcastsOnly?: boolean;
    groupsOnly?: boolean;
    usersOnly?: boolean;
    folderId?: number;
    q!: string;
    filter!: TypeMessagesFilter;
    minDate?: number;
    maxDate!: number;
    offsetRate?: number;
    offsetPeer!: EntityLike;
    offsetId!: number;
    limit!: number;

    constructor(args: { flags?: number, broadcastsOnly?: boolean, groupsOnly?: boolean, usersOnly?: boolean, folderId?: number, q?: string, filter?: TypeMessagesFilter, minDate?: number, maxDate?: number, offsetRate?: number, offsetPeer?: EntityLike, offsetId?: number, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.broadcastsOnly = args.broadcastsOnly;
        this.groupsOnly = args.groupsOnly;
        this.usersOnly = args.usersOnly;
        this.folderId = args.folderId;
        this.q = args.q!;
        this.filter = args.filter!;
        this.minDate = args.minDate;
        this.maxDate = args.maxDate!;
        this.offsetRate = args.offsetRate;
        this.offsetPeer = args.offsetPeer!;
        this.offsetId = args.offsetId!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1271290010, false);
        let flags = 0;
        if (this.broadcastsOnly) { flags |= 1 << 1; }
        if (this.groupsOnly) { flags |= 1 << 2; }
        if (this.usersOnly) { flags |= 1 << 3; }
        if (this.folderId !== undefined && this.folderId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.broadcastsOnly !== undefined && this.broadcastsOnly !== null) {
        }
        if (this.groupsOnly !== undefined && this.groupsOnly !== null) {
        }
        if (this.usersOnly !== undefined && this.usersOnly !== null) {
        }
        if (this.folderId !== undefined && this.folderId !== null) {
            writer.writeInt(this.folderId);
        }
        writer.tgWriteString(this.q);
        writer.write(this.filter.getBytes());
        writer.writeInt(this.minDate!);
        writer.writeInt(this.maxDate);
        writer.writeInt(this.offsetRate!);
        writer.write((this.offsetPeer as any).getBytes());
        writer.writeInt(this.offsetId);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SearchGlobal {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _broadcastsOnly = true;
            args.broadcastsOnly = _broadcastsOnly;
        } else {
            args.broadcastsOnly = false;
        }
        if (args.flags & (1 << 2)) {
            const _groupsOnly = true;
            args.groupsOnly = _groupsOnly;
        } else {
            args.groupsOnly = false;
        }
        if (args.flags & (1 << 3)) {
            const _usersOnly = true;
            args.usersOnly = _usersOnly;
        } else {
            args.usersOnly = false;
        }
        if (args.flags & (1 << 0)) {
            const _folderId = reader.readInt();
            args.folderId = _folderId;
        } else {
            args.folderId = undefined;
        }
        const _q = reader.tgReadString();
        args.q = _q;
        const _filter = reader.tgReadObject();
        args.filter = _filter;
        const _minDate = reader.readInt();
        args.minDate = _minDate;
        const _maxDate = reader.readInt();
        args.maxDate = _maxDate;
        const _offsetRate = reader.readInt();
        args.offsetRate = _offsetRate;
        const _offsetPeer = reader.tgReadObject();
        args.offsetPeer = _offsetPeer;
        const _offsetId = reader.readInt();
        args.offsetId = _offsetId;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new SearchGlobal(args);
    }
}