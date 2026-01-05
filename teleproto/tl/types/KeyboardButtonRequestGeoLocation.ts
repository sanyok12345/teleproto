import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class KeyboardButtonRequestGeoLocation extends TLObject {
    static CONSTRUCTOR_ID = 4235815743;
    static SUBCLASS_OF_ID = 195916963;
    static className = "KeyboardButtonRequestGeoLocation";
    static classType = "constructor";

    text!: string;

    constructor(args: { text?: string } = {}) {
        super();
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4235815743, false);
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButtonRequestGeoLocation {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        return new KeyboardButtonRequestGeoLocation(args);
    }
}