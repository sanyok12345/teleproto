import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class InputInvoiceStarGift extends TLObject {
    static CONSTRUCTOR_ID = 3898760850;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoiceStarGift";
    static classType = "constructor";

    flags!: number;
    hideName?: boolean;
    includeUpgrade?: boolean;
    peer!: TypeInputPeer;
    giftId!: bigint;
    message?: TypeTextWithEntities;

    constructor(args: { flags?: number, hideName?: boolean, includeUpgrade?: boolean, peer?: TypeInputPeer, giftId?: bigint, message?: TypeTextWithEntities } = {}) {
        super();
        this.flags = args.flags!;
        this.hideName = args.hideName;
        this.includeUpgrade = args.includeUpgrade;
        this.peer = args.peer!;
        this.giftId = args.giftId!;
        this.message = args.message;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3898760850, false);
        let flags = 0;
        if (this.hideName) { flags |= 1 << 0; }
        if (this.includeUpgrade) { flags |= 1 << 2; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.hideName !== undefined && this.hideName !== null) {
        }
        if (this.includeUpgrade !== undefined && this.includeUpgrade !== null) {
        }
        writer.write(this.peer.getBytes());
        writer.writeLargeInt(this.giftId, 64);
        if (this.message !== undefined && this.message !== null) {
            writer.write(this.message.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoiceStarGift {
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
            const _includeUpgrade = true;
            args.includeUpgrade = _includeUpgrade;
        } else {
            args.includeUpgrade = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _giftId = reader.readLargeInt(64);
        args.giftId = _giftId;
        if (args.flags & (1 << 1)) {
            const _message = reader.tgReadObject();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        return new InputInvoiceStarGift(args);
    }
}