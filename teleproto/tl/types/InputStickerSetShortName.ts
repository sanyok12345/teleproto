import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStickerSetShortName extends TLObject {
    static CONSTRUCTOR_ID = 2250033312;
    static SUBCLASS_OF_ID = 1034127786;
    static className = "InputStickerSetShortName";
    static classType = "constructor";

    shortName!: string;

    constructor(args: { shortName?: string } = {}) {
        super();
        this.shortName = args.shortName!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2250033312, false);
        writer.tgWriteString(this.shortName);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickerSetShortName {
        const args: any = {};
        const _shortName = reader.tgReadString();
        args.shortName = _shortName;
        return new InputStickerSetShortName(args);
    }
}