import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SuggestedShortName extends TLObject {
    static CONSTRUCTOR_ID = 2248056895;
    static SUBCLASS_OF_ID = 3293203233;
    static className = "stickers.SuggestedShortName";
    static classType = "constructor";

    shortName!: string;

    constructor(args: { shortName?: string } = {}) {
        super();
        this.shortName = args.shortName!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2248056895, false);
        writer.tgWriteString(this.shortName);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SuggestedShortName {
        const args: any = {};
        const _shortName = reader.tgReadString();
        args.shortName = _shortName;
        return new SuggestedShortName(args);
    }
}