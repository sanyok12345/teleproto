import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageExtendedMedia } from "./TypeMessageExtendedMedia";

export class MessageMediaPaidMedia extends TLObject {
    static CONSTRUCTOR_ID = 2827297937;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaPaidMedia";
    static classType = "constructor";

    starsAmount!: bigint;
    extendedMedia!: TypeMessageExtendedMedia[];

    constructor(args: { starsAmount?: bigint, extendedMedia?: TypeMessageExtendedMedia[] } = {}) {
        super();
        this.starsAmount = args.starsAmount!;
        this.extendedMedia = args.extendedMedia!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2827297937, false);
        writer.writeLargeInt(this.starsAmount, 64);
        writer.writeVector(this.extendedMedia, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaPaidMedia {
        const args: any = {};
        const _starsAmount = reader.readLargeInt(64);
        args.starsAmount = _starsAmount;
        const _extendedMedia = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.extendedMedia = _extendedMedia;
        return new MessageMediaPaidMedia(args);
    }
}