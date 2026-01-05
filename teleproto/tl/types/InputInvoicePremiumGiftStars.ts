import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputUser } from "./TypeInputUser";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class InputInvoicePremiumGiftStars extends TLObject {
    static CONSTRUCTOR_ID = 3669668591;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoicePremiumGiftStars";
    static classType = "constructor";

    flags!: number;
    userId!: TypeInputUser;
    months!: number;
    message?: TypeTextWithEntities;

    constructor(args: { flags?: number, userId?: TypeInputUser, months?: number, message?: TypeTextWithEntities } = {}) {
        super();
        this.flags = args.flags!;
        this.userId = args.userId!;
        this.months = args.months!;
        this.message = args.message;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3669668591, false);
        let flags = 0;
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.userId.getBytes());
        writer.writeInt(this.months);
        if (this.message !== undefined && this.message !== null) {
            writer.write(this.message.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoicePremiumGiftStars {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _months = reader.readInt();
        args.months = _months;
        if (args.flags & (1 << 0)) {
            const _message = reader.tgReadObject();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        return new InputInvoicePremiumGiftStars(args);
    }
}