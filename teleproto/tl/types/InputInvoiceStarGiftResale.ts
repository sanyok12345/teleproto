import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputInvoiceStarGiftResale extends TLObject {
    static CONSTRUCTOR_ID = 3281998628;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoiceStarGiftResale";
    static classType = "constructor";

    flags!: number;
    ton?: boolean;
    slug!: string;
    toId!: TypeInputPeer;

    constructor(args: { flags?: number, ton?: boolean, slug?: string, toId?: TypeInputPeer } = {}) {
        super();
        this.flags = args.flags!;
        this.ton = args.ton;
        this.slug = args.slug!;
        this.toId = args.toId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3281998628, false);
        let flags = 0;
        if (this.ton) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.ton !== undefined && this.ton !== null) {
        }
        writer.tgWriteString(this.slug);
        writer.write(this.toId.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoiceStarGiftResale {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _ton = true;
            args.ton = _ton;
        } else {
            args.ton = false;
        }
        const _slug = reader.tgReadString();
        args.slug = _slug;
        const _toId = reader.tgReadObject();
        args.toId = _toId;
        return new InputInvoiceStarGiftResale(args);
    }
}