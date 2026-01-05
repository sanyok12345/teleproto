import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionGiveawayLaunch extends TLObject {
    static CONSTRUCTOR_ID = 2819576292;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionGiveawayLaunch";
    static classType = "constructor";

    flags!: number;
    stars?: bigint;

    constructor(args: { flags?: number, stars?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.stars = args.stars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2819576292, false);
        let flags = 0;
        if (this.stars !== undefined && this.stars !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.stars !== undefined && this.stars !== null) {
            writer.writeLargeInt(this.stars, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionGiveawayLaunch {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _stars = reader.readLargeInt(64);
            args.stars = _stars;
        } else {
            args.stars = undefined;
        }
        return new MessageActionGiveawayLaunch(args);
    }
}