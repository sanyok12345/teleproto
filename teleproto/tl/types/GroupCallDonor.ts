import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class GroupCallDonor extends TLObject {
    static CONSTRUCTOR_ID = 3997371525;
    static SUBCLASS_OF_ID = 351439792;
    static className = "GroupCallDonor";
    static classType = "constructor";

    flags!: number;
    top?: boolean;
    my?: boolean;
    peerId?: TypePeer;
    stars!: bigint;

    constructor(args: { flags?: number, top?: boolean, my?: boolean, peerId?: TypePeer, stars?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.top = args.top;
        this.my = args.my;
        this.peerId = args.peerId;
        this.stars = args.stars!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3997371525, false);
        let flags = 0;
        if (this.top) { flags |= 1 << 0; }
        if (this.my) { flags |= 1 << 1; }
        if (this.peerId !== undefined && this.peerId !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.top !== undefined && this.top !== null) {
        }
        if (this.my !== undefined && this.my !== null) {
        }
        if (this.peerId !== undefined && this.peerId !== null) {
            writer.write(this.peerId.getBytes());
        }
        writer.writeLargeInt(this.stars, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GroupCallDonor {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _top = true;
            args.top = _top;
        } else {
            args.top = false;
        }
        if (args.flags & (1 << 1)) {
            const _my = true;
            args.my = _my;
        } else {
            args.my = false;
        }
        if (args.flags & (1 << 3)) {
            const _peerId = reader.tgReadObject();
            args.peerId = _peerId;
        } else {
            args.peerId = undefined;
        }
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        return new GroupCallDonor(args);
    }
}