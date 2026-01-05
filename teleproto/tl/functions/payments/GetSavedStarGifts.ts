import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeSavedStarGifts } from "../../types/payments/TypeSavedStarGifts";

export class GetSavedStarGifts extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2736383337;
    static SUBCLASS_OF_ID = 3574671511;
    static className = "payments.GetSavedStarGifts";
    static classType = "request";

    flags?: number;
    excludeUnsaved?: boolean;
    excludeSaved?: boolean;
    excludeUnlimited?: boolean;
    excludeUnique?: boolean;
    sortByValue?: boolean;
    excludeUpgradable?: boolean;
    excludeUnupgradable?: boolean;
    peerColorAvailable?: boolean;
    excludeHosted?: boolean;
    peer?: EntityLike;
    collectionId?: number;
    offset!: string;
    limit!: number;

    constructor(args: { flags?: number, excludeUnsaved?: boolean, excludeSaved?: boolean, excludeUnlimited?: boolean, excludeUnique?: boolean, sortByValue?: boolean, excludeUpgradable?: boolean, excludeUnupgradable?: boolean, peerColorAvailable?: boolean, excludeHosted?: boolean, peer?: EntityLike, collectionId?: number, offset?: string, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.excludeUnsaved = args.excludeUnsaved;
        this.excludeSaved = args.excludeSaved;
        this.excludeUnlimited = args.excludeUnlimited;
        this.excludeUnique = args.excludeUnique;
        this.sortByValue = args.sortByValue;
        this.excludeUpgradable = args.excludeUpgradable;
        this.excludeUnupgradable = args.excludeUnupgradable;
        this.peerColorAvailable = args.peerColorAvailable;
        this.excludeHosted = args.excludeHosted;
        this.peer = args.peer;
        this.collectionId = args.collectionId;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2736383337, false);
        let flags = 0;
        if (this.excludeUnsaved) { flags |= 1 << 0; }
        if (this.excludeSaved) { flags |= 1 << 1; }
        if (this.excludeUnlimited) { flags |= 1 << 2; }
        if (this.excludeUnique) { flags |= 1 << 4; }
        if (this.sortByValue) { flags |= 1 << 5; }
        if (this.excludeUpgradable) { flags |= 1 << 7; }
        if (this.excludeUnupgradable) { flags |= 1 << 8; }
        if (this.peerColorAvailable) { flags |= 1 << 9; }
        if (this.excludeHosted) { flags |= 1 << 10; }
        if (this.collectionId !== undefined && this.collectionId !== null) { flags |= 1 << 6; }
        writer.writeInt(flags, false);
        if (this.excludeUnsaved !== undefined && this.excludeUnsaved !== null) {
        }
        if (this.excludeSaved !== undefined && this.excludeSaved !== null) {
        }
        if (this.excludeUnlimited !== undefined && this.excludeUnlimited !== null) {
        }
        if (this.excludeUnique !== undefined && this.excludeUnique !== null) {
        }
        if (this.sortByValue !== undefined && this.sortByValue !== null) {
        }
        if (this.excludeUpgradable !== undefined && this.excludeUpgradable !== null) {
        }
        if (this.excludeUnupgradable !== undefined && this.excludeUnupgradable !== null) {
        }
        if (this.peerColorAvailable !== undefined && this.peerColorAvailable !== null) {
        }
        if (this.excludeHosted !== undefined && this.excludeHosted !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (this.collectionId !== undefined && this.collectionId !== null) {
            writer.writeInt(this.collectionId);
        }
        writer.tgWriteString(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSavedStarGifts {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSavedStarGifts {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _excludeUnsaved = true;
            args.excludeUnsaved = _excludeUnsaved;
        } else {
            args.excludeUnsaved = false;
        }
        if (args.flags & (1 << 1)) {
            const _excludeSaved = true;
            args.excludeSaved = _excludeSaved;
        } else {
            args.excludeSaved = false;
        }
        if (args.flags & (1 << 2)) {
            const _excludeUnlimited = true;
            args.excludeUnlimited = _excludeUnlimited;
        } else {
            args.excludeUnlimited = false;
        }
        if (args.flags & (1 << 4)) {
            const _excludeUnique = true;
            args.excludeUnique = _excludeUnique;
        } else {
            args.excludeUnique = false;
        }
        if (args.flags & (1 << 5)) {
            const _sortByValue = true;
            args.sortByValue = _sortByValue;
        } else {
            args.sortByValue = false;
        }
        if (args.flags & (1 << 7)) {
            const _excludeUpgradable = true;
            args.excludeUpgradable = _excludeUpgradable;
        } else {
            args.excludeUpgradable = false;
        }
        if (args.flags & (1 << 8)) {
            const _excludeUnupgradable = true;
            args.excludeUnupgradable = _excludeUnupgradable;
        } else {
            args.excludeUnupgradable = false;
        }
        if (args.flags & (1 << 9)) {
            const _peerColorAvailable = true;
            args.peerColorAvailable = _peerColorAvailable;
        } else {
            args.peerColorAvailable = false;
        }
        if (args.flags & (1 << 10)) {
            const _excludeHosted = true;
            args.excludeHosted = _excludeHosted;
        } else {
            args.excludeHosted = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 6)) {
            const _collectionId = reader.readInt();
            args.collectionId = _collectionId;
        } else {
            args.collectionId = undefined;
        }
        const _offset = reader.tgReadString();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetSavedStarGifts(args);
    }
}