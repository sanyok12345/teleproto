import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class InputInvoiceStarGiftAuctionBid extends TLObject {
    static CONSTRUCTOR_ID = 516618768;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoiceStarGiftAuctionBid";
    static classType = "constructor";

    flags!: number;
    hideName?: boolean;
    updateBid?: boolean;
    peer?: TypeInputPeer;
    giftId!: bigint;
    bidAmount!: bigint;
    message?: TypeTextWithEntities;

    constructor(args: { flags?: number, hideName?: boolean, updateBid?: boolean, peer?: TypeInputPeer, giftId?: bigint, bidAmount?: bigint, message?: TypeTextWithEntities } = {}) {
        super();
        this.flags = args.flags!;
        this.hideName = args.hideName;
        this.updateBid = args.updateBid;
        this.peer = args.peer;
        this.giftId = args.giftId!;
        this.bidAmount = args.bidAmount!;
        this.message = args.message;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(516618768, false);
        let flags = 0;
        if (this.hideName) { flags |= 1 << 0; }
        if (this.updateBid) { flags |= 1 << 2; }
        if (this.peer !== undefined && this.peer !== null) { flags |= 1 << 3; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.hideName !== undefined && this.hideName !== null) {
        }
        if (this.updateBid !== undefined && this.updateBid !== null) {
        }
        if (this.peer !== undefined && this.peer !== null) {
            writer.write(this.peer.getBytes());
        }
        writer.writeLargeInt(this.giftId, 64);
        writer.writeLargeInt(this.bidAmount, 64);
        if (this.message !== undefined && this.message !== null) {
            writer.write(this.message.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoiceStarGiftAuctionBid {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _hideName = true;
            args.hideName = _hideName;
        } else {
            args.hideName = false;
        }
        if (args.flags & (1 << 2)) {
            const _updateBid = true;
            args.updateBid = _updateBid;
        } else {
            args.updateBid = false;
        }
        if (args.flags & (1 << 3)) {
            const _peer = reader.tgReadObject();
            args.peer = _peer;
        } else {
            args.peer = undefined;
        }
        const _giftId = reader.readLargeInt(64);
        args.giftId = _giftId;
        const _bidAmount = reader.readLargeInt(64);
        args.bidAmount = _bidAmount;
        if (args.flags & (1 << 1)) {
            const _message = reader.tgReadObject();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        return new InputInvoiceStarGiftAuctionBid(args);
    }
}