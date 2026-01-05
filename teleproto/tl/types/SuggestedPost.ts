import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarsAmount } from "./TypeStarsAmount";

export class SuggestedPost extends TLObject {
    static CONSTRUCTOR_ID = 244201445;
    static SUBCLASS_OF_ID = 2389869056;
    static className = "SuggestedPost";
    static classType = "constructor";

    flags!: number;
    accepted?: boolean;
    rejected?: boolean;
    price?: TypeStarsAmount;
    scheduleDate?: number;

    constructor(args: { flags?: number, accepted?: boolean, rejected?: boolean, price?: TypeStarsAmount, scheduleDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.accepted = args.accepted;
        this.rejected = args.rejected;
        this.price = args.price;
        this.scheduleDate = args.scheduleDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(244201445, false);
        let flags = 0;
        if (this.accepted) { flags |= 1 << 1; }
        if (this.rejected) { flags |= 1 << 2; }
        if (this.price !== undefined && this.price !== null) { flags |= 1 << 3; }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.accepted !== undefined && this.accepted !== null) {
        }
        if (this.rejected !== undefined && this.rejected !== null) {
        }
        if (this.price !== undefined && this.price !== null) {
            writer.write(this.price.getBytes());
        }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) {
            writer.writeInt(this.scheduleDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SuggestedPost {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _accepted = true;
            args.accepted = _accepted;
        } else {
            args.accepted = false;
        }
        if (args.flags & (1 << 2)) {
            const _rejected = true;
            args.rejected = _rejected;
        } else {
            args.rejected = false;
        }
        if (args.flags & (1 << 3)) {
            const _price = reader.tgReadObject();
            args.price = _price;
        } else {
            args.price = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _scheduleDate = reader.readInt();
            args.scheduleDate = _scheduleDate;
        } else {
            args.scheduleDate = undefined;
        }
        return new SuggestedPost(args);
    }
}