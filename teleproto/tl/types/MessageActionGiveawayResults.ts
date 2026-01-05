import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionGiveawayResults extends TLObject {
    static CONSTRUCTOR_ID = 2279797077;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionGiveawayResults";
    static classType = "constructor";

    flags!: number;
    stars?: boolean;
    winnersCount!: number;
    unclaimedCount!: number;

    constructor(args: { flags?: number, stars?: boolean, winnersCount?: number, unclaimedCount?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.stars = args.stars;
        this.winnersCount = args.winnersCount!;
        this.unclaimedCount = args.unclaimedCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2279797077, false);
        let flags = 0;
        if (this.stars) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.stars !== undefined && this.stars !== null) {
        }
        writer.writeInt(this.winnersCount);
        writer.writeInt(this.unclaimedCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionGiveawayResults {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _stars = true;
            args.stars = _stars;
        } else {
            args.stars = false;
        }
        const _winnersCount = reader.readInt();
        args.winnersCount = _winnersCount;
        const _unclaimedCount = reader.readInt();
        args.unclaimedCount = _unclaimedCount;
        return new MessageActionGiveawayResults(args);
    }
}