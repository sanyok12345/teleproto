import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputMedia } from "./TypeInputMedia";

export class InputMediaPaidMedia extends TLObject {
    static CONSTRUCTOR_ID = 3289396102;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaPaidMedia";
    static classType = "constructor";

    flags!: number;
    starsAmount!: bigint;
    extendedMedia!: TypeInputMedia[];
    payload?: string;

    constructor(args: { flags?: number, starsAmount?: bigint, extendedMedia?: TypeInputMedia[], payload?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.starsAmount = args.starsAmount!;
        this.extendedMedia = args.extendedMedia!;
        this.payload = args.payload;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3289396102, false);
        let flags = 0;
        if (this.payload !== undefined && this.payload !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.starsAmount, 64);
        writer.writeVector(this.extendedMedia, (item) => {
            writer.write(item.getBytes());
        });
        if (this.payload !== undefined && this.payload !== null) {
            writer.tgWriteString(this.payload);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaPaidMedia {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _starsAmount = reader.readLargeInt(64);
        args.starsAmount = _starsAmount;
        const _extendedMedia = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.extendedMedia = _extendedMedia;
        if (args.flags & (1 << 0)) {
            const _payload = reader.tgReadString();
            args.payload = _payload;
        } else {
            args.payload = undefined;
        }
        return new InputMediaPaidMedia(args);
    }
}