import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarGift } from "./TypeStarGift";
import { TypePeer } from "./TypePeer";
import { TypeStarsAmount } from "./TypeStarsAmount";

export class MessageActionStarGiftUnique extends TLObject {
    static CONSTRUCTOR_ID = 2507310403;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionStarGiftUnique";
    static classType = "constructor";

    flags!: number;
    upgrade?: boolean;
    transferred?: boolean;
    saved?: boolean;
    refunded?: boolean;
    prepaidUpgrade?: boolean;
    assigned?: boolean;
    fromOffer?: boolean;
    gift!: TypeStarGift;
    canExportAt?: number;
    transferStars?: bigint;
    fromId?: TypePeer;
    peer?: TypePeer;
    savedId?: bigint;
    resaleAmount?: TypeStarsAmount;
    canTransferAt?: number;
    canResellAt?: number;
    dropOriginalDetailsStars?: bigint;

    constructor(args: { flags?: number, upgrade?: boolean, transferred?: boolean, saved?: boolean, refunded?: boolean, prepaidUpgrade?: boolean, assigned?: boolean, fromOffer?: boolean, gift?: TypeStarGift, canExportAt?: number, transferStars?: bigint, fromId?: TypePeer, peer?: TypePeer, savedId?: bigint, resaleAmount?: TypeStarsAmount, canTransferAt?: number, canResellAt?: number, dropOriginalDetailsStars?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.upgrade = args.upgrade;
        this.transferred = args.transferred;
        this.saved = args.saved;
        this.refunded = args.refunded;
        this.prepaidUpgrade = args.prepaidUpgrade;
        this.assigned = args.assigned;
        this.fromOffer = args.fromOffer;
        this.gift = args.gift!;
        this.canExportAt = args.canExportAt;
        this.transferStars = args.transferStars;
        this.fromId = args.fromId;
        this.peer = args.peer;
        this.savedId = args.savedId;
        this.resaleAmount = args.resaleAmount;
        this.canTransferAt = args.canTransferAt;
        this.canResellAt = args.canResellAt;
        this.dropOriginalDetailsStars = args.dropOriginalDetailsStars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2507310403, false);
        let flags = 0;
        if (this.upgrade) { flags |= 1 << 0; }
        if (this.transferred) { flags |= 1 << 1; }
        if (this.saved) { flags |= 1 << 2; }
        if (this.refunded) { flags |= 1 << 5; }
        if (this.prepaidUpgrade) { flags |= 1 << 11; }
        if (this.assigned) { flags |= 1 << 13; }
        if (this.fromOffer) { flags |= 1 << 14; }
        if (this.canExportAt !== undefined && this.canExportAt !== null) { flags |= 1 << 3; }
        if (this.transferStars !== undefined && this.transferStars !== null) { flags |= 1 << 4; }
        if (this.fromId !== undefined && this.fromId !== null) { flags |= 1 << 6; }
        if (this.peer !== undefined && this.peer !== null) { flags |= 1 << 7; }
        if (this.savedId !== undefined && this.savedId !== null) { flags |= 1 << 7; }
        if (this.resaleAmount !== undefined && this.resaleAmount !== null) { flags |= 1 << 8; }
        if (this.canTransferAt !== undefined && this.canTransferAt !== null) { flags |= 1 << 9; }
        if (this.canResellAt !== undefined && this.canResellAt !== null) { flags |= 1 << 10; }
        if (this.dropOriginalDetailsStars !== undefined && this.dropOriginalDetailsStars !== null) { flags |= 1 << 12; }
        writer.writeInt(flags, false);
        if (this.upgrade !== undefined && this.upgrade !== null) {
        }
        if (this.transferred !== undefined && this.transferred !== null) {
        }
        if (this.saved !== undefined && this.saved !== null) {
        }
        if (this.refunded !== undefined && this.refunded !== null) {
        }
        if (this.prepaidUpgrade !== undefined && this.prepaidUpgrade !== null) {
        }
        if (this.assigned !== undefined && this.assigned !== null) {
        }
        if (this.fromOffer !== undefined && this.fromOffer !== null) {
        }
        writer.write(this.gift.getBytes());
        if (this.canExportAt !== undefined && this.canExportAt !== null) {
            writer.writeInt(this.canExportAt);
        }
        if (this.transferStars !== undefined && this.transferStars !== null) {
            writer.writeLargeInt(this.transferStars, 64);
        }
        if (this.fromId !== undefined && this.fromId !== null) {
            writer.write(this.fromId.getBytes());
        }
        if (this.peer !== undefined && this.peer !== null) {
            writer.write(this.peer.getBytes());
        }
        if (this.savedId !== undefined && this.savedId !== null) {
            writer.writeLargeInt(this.savedId, 64);
        }
        if (this.resaleAmount !== undefined && this.resaleAmount !== null) {
            writer.write(this.resaleAmount.getBytes());
        }
        if (this.canTransferAt !== undefined && this.canTransferAt !== null) {
            writer.writeInt(this.canTransferAt);
        }
        if (this.canResellAt !== undefined && this.canResellAt !== null) {
            writer.writeInt(this.canResellAt);
        }
        if (this.dropOriginalDetailsStars !== undefined && this.dropOriginalDetailsStars !== null) {
            writer.writeLargeInt(this.dropOriginalDetailsStars, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionStarGiftUnique {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _upgrade = true;
            args.upgrade = _upgrade;
        } else {
            args.upgrade = false;
        }
        if (args.flags & (1 << 1)) {
            const _transferred = true;
            args.transferred = _transferred;
        } else {
            args.transferred = false;
        }
        if (args.flags & (1 << 2)) {
            const _saved = true;
            args.saved = _saved;
        } else {
            args.saved = false;
        }
        if (args.flags & (1 << 5)) {
            const _refunded = true;
            args.refunded = _refunded;
        } else {
            args.refunded = false;
        }
        if (args.flags & (1 << 11)) {
            const _prepaidUpgrade = true;
            args.prepaidUpgrade = _prepaidUpgrade;
        } else {
            args.prepaidUpgrade = false;
        }
        if (args.flags & (1 << 13)) {
            const _assigned = true;
            args.assigned = _assigned;
        } else {
            args.assigned = false;
        }
        if (args.flags & (1 << 14)) {
            const _fromOffer = true;
            args.fromOffer = _fromOffer;
        } else {
            args.fromOffer = false;
        }
        const _gift = reader.tgReadObject();
        args.gift = _gift;
        if (args.flags & (1 << 3)) {
            const _canExportAt = reader.readInt();
            args.canExportAt = _canExportAt;
        } else {
            args.canExportAt = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _transferStars = reader.readLargeInt(64);
            args.transferStars = _transferStars;
        } else {
            args.transferStars = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _fromId = reader.tgReadObject();
            args.fromId = _fromId;
        } else {
            args.fromId = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _peer = reader.tgReadObject();
            args.peer = _peer;
        } else {
            args.peer = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _savedId = reader.readLargeInt(64);
            args.savedId = _savedId;
        } else {
            args.savedId = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _resaleAmount = reader.tgReadObject();
            args.resaleAmount = _resaleAmount;
        } else {
            args.resaleAmount = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _canTransferAt = reader.readInt();
            args.canTransferAt = _canTransferAt;
        } else {
            args.canTransferAt = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _canResellAt = reader.readInt();
            args.canResellAt = _canResellAt;
        } else {
            args.canResellAt = undefined;
        }
        if (args.flags & (1 << 12)) {
            const _dropOriginalDetailsStars = reader.readLargeInt(64);
            args.dropOriginalDetailsStars = _dropOriginalDetailsStars;
        } else {
            args.dropOriginalDetailsStars = undefined;
        }
        return new MessageActionStarGiftUnique(args);
    }
}