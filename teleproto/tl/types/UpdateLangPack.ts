import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeLangPackDifference } from "./TypeLangPackDifference";

export class UpdateLangPack extends TLObject {
    static CONSTRUCTOR_ID = 1442983757;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateLangPack";
    static classType = "constructor";

    difference!: TypeLangPackDifference;

    constructor(args: { difference?: TypeLangPackDifference } = {}) {
        super();
        this.difference = args.difference!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1442983757, false);
        writer.write(this.difference.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateLangPack {
        const args: any = {};
        const _difference = reader.tgReadObject();
        args.difference = _difference;
        return new UpdateLangPack(args);
    }
}