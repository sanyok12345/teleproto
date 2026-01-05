import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStoriesStealthMode } from "./TypeStoriesStealthMode";

export class UpdateStoriesStealthMode extends TLObject {
    static CONSTRUCTOR_ID = 738741697;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateStoriesStealthMode";
    static classType = "constructor";

    stealthMode!: TypeStoriesStealthMode;

    constructor(args: { stealthMode?: TypeStoriesStealthMode } = {}) {
        super();
        this.stealthMode = args.stealthMode!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(738741697, false);
        writer.write(this.stealthMode.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateStoriesStealthMode {
        const args: any = {};
        const _stealthMode = reader.tgReadObject();
        args.stealthMode = _stealthMode;
        return new UpdateStoriesStealthMode(args);
    }
}