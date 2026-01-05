import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputStickerSet } from "./TypeInputStickerSet";

export class InputStickerSetThumb extends TLObject {
    static CONSTRUCTOR_ID = 2642736091;
    static SUBCLASS_OF_ID = 354669666;
    static className = "InputStickerSetThumb";
    static classType = "constructor";

    stickerset!: TypeInputStickerSet;
    thumbVersion!: number;

    constructor(args: { stickerset?: TypeInputStickerSet, thumbVersion?: number } = {}) {
        super();
        this.stickerset = args.stickerset!;
        this.thumbVersion = args.thumbVersion!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2642736091, false);
        writer.write(this.stickerset.getBytes());
        writer.writeInt(this.thumbVersion);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickerSetThumb {
        const args: any = {};
        const _stickerset = reader.tgReadObject();
        args.stickerset = _stickerset;
        const _thumbVersion = reader.readInt();
        args.thumbVersion = _thumbVersion;
        return new InputStickerSetThumb(args);
    }
}