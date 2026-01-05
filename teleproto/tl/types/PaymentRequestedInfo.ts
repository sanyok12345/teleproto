import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePostAddress } from "./TypePostAddress";

export class PaymentRequestedInfo extends TLObject {
    static CONSTRUCTOR_ID = 2426158996;
    static SUBCLASS_OF_ID = 2377134406;
    static className = "PaymentRequestedInfo";
    static classType = "constructor";

    flags!: number;
    name?: string;
    phone?: string;
    email?: string;
    shippingAddress?: TypePostAddress;

    constructor(args: { flags?: number, name?: string, phone?: string, email?: string, shippingAddress?: TypePostAddress } = {}) {
        super();
        this.flags = args.flags!;
        this.name = args.name;
        this.phone = args.phone;
        this.email = args.email;
        this.shippingAddress = args.shippingAddress;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2426158996, false);
        let flags = 0;
        if (this.name !== undefined && this.name !== null) { flags |= 1 << 0; }
        if (this.phone !== undefined && this.phone !== null) { flags |= 1 << 1; }
        if (this.email !== undefined && this.email !== null) { flags |= 1 << 2; }
        if (this.shippingAddress !== undefined && this.shippingAddress !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.name !== undefined && this.name !== null) {
            writer.tgWriteString(this.name);
        }
        if (this.phone !== undefined && this.phone !== null) {
            writer.tgWriteString(this.phone);
        }
        if (this.email !== undefined && this.email !== null) {
            writer.tgWriteString(this.email);
        }
        if (this.shippingAddress !== undefined && this.shippingAddress !== null) {
            writer.write(this.shippingAddress.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaymentRequestedInfo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _name = reader.tgReadString();
            args.name = _name;
        } else {
            args.name = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _phone = reader.tgReadString();
            args.phone = _phone;
        } else {
            args.phone = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _email = reader.tgReadString();
            args.email = _email;
        } else {
            args.email = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _shippingAddress = reader.tgReadObject();
            args.shippingAddress = _shippingAddress;
        } else {
            args.shippingAddress = undefined;
        }
        return new PaymentRequestedInfo(args);
    }
}