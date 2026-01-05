import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarsAmount } from "./TypeStarsAmount";

export class MessageActionSuggestedPostApproval extends TLObject {
    static CONSTRUCTOR_ID = 4000978326;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionSuggestedPostApproval";
    static classType = "constructor";

    flags!: number;
    rejected?: boolean;
    balanceTooLow?: boolean;
    rejectComment?: string;
    scheduleDate?: number;
    price?: TypeStarsAmount;

    constructor(args: { flags?: number, rejected?: boolean, balanceTooLow?: boolean, rejectComment?: string, scheduleDate?: number, price?: TypeStarsAmount } = {}) {
        super();
        this.flags = args.flags!;
        this.rejected = args.rejected;
        this.balanceTooLow = args.balanceTooLow;
        this.rejectComment = args.rejectComment;
        this.scheduleDate = args.scheduleDate;
        this.price = args.price;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4000978326, false);
        let flags = 0;
        if (this.rejected) { flags |= 1 << 0; }
        if (this.balanceTooLow) { flags |= 1 << 1; }
        if (this.rejectComment !== undefined && this.rejectComment !== null) { flags |= 1 << 2; }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) { flags |= 1 << 3; }
        if (this.price !== undefined && this.price !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.rejected !== undefined && this.rejected !== null) {
        }
        if (this.balanceTooLow !== undefined && this.balanceTooLow !== null) {
        }
        if (this.rejectComment !== undefined && this.rejectComment !== null) {
            writer.tgWriteString(this.rejectComment);
        }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) {
            writer.writeInt(this.scheduleDate);
        }
        if (this.price !== undefined && this.price !== null) {
            writer.write(this.price.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionSuggestedPostApproval {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _rejected = true;
            args.rejected = _rejected;
        } else {
            args.rejected = false;
        }
        if (args.flags & (1 << 1)) {
            const _balanceTooLow = true;
            args.balanceTooLow = _balanceTooLow;
        } else {
            args.balanceTooLow = false;
        }
        if (args.flags & (1 << 2)) {
            const _rejectComment = reader.tgReadString();
            args.rejectComment = _rejectComment;
        } else {
            args.rejectComment = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _scheduleDate = reader.readInt();
            args.scheduleDate = _scheduleDate;
        } else {
            args.scheduleDate = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _price = reader.tgReadObject();
            args.price = _price;
        } else {
            args.price = undefined;
        }
        return new MessageActionSuggestedPostApproval(args);
    }
}