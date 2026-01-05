import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MessageActionPrizeStars extends TLObject {
    static CONSTRUCTOR_ID = 2953594786;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionPrizeStars";
    static classType = "constructor";

    flags!: number;
    unclaimed?: boolean;
    stars!: bigint;
    transactionId!: string;
    boostPeer!: TypePeer;
    giveawayMsgId!: number;

    constructor(args: { flags?: number, unclaimed?: boolean, stars?: bigint, transactionId?: string, boostPeer?: TypePeer, giveawayMsgId?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.unclaimed = args.unclaimed;
        this.stars = args.stars!;
        this.transactionId = args.transactionId!;
        this.boostPeer = args.boostPeer!;
        this.giveawayMsgId = args.giveawayMsgId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2953594786, false);
        let flags = 0;
        if (this.unclaimed) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.unclaimed !== undefined && this.unclaimed !== null) {
        }
        writer.writeLargeInt(this.stars, 64);
        writer.tgWriteString(this.transactionId);
        writer.write(this.boostPeer.getBytes());
        writer.writeInt(this.giveawayMsgId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionPrizeStars {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _unclaimed = true;
            args.unclaimed = _unclaimed;
        } else {
            args.unclaimed = false;
        }
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        const _transactionId = reader.tgReadString();
        args.transactionId = _transactionId;
        const _boostPeer = reader.tgReadObject();
        args.boostPeer = _boostPeer;
        const _giveawayMsgId = reader.readInt();
        args.giveawayMsgId = _giveawayMsgId;
        return new MessageActionPrizeStars(args);
    }
}