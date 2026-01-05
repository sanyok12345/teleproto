import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStarsTransaction extends TLObject {
    static CONSTRUCTOR_ID = 543876817;
    static SUBCLASS_OF_ID = 300026090;
    static className = "InputStarsTransaction";
    static classType = "constructor";

    flags!: number;
    refund?: boolean;
    id!: string;

    constructor(args: { flags?: number, refund?: boolean, id?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.refund = args.refund;
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(543876817, false);
        let flags = 0;
        if (this.refund) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.refund !== undefined && this.refund !== null) {
        }
        writer.tgWriteString(this.id);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStarsTransaction {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _refund = true;
            args.refund = _refund;
        } else {
            args.refund = false;
        }
        const _id = reader.tgReadString();
        args.id = _id;
        return new InputStarsTransaction(args);
    }
}