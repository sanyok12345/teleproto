import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMediaDice extends TLObject {
    static CONSTRUCTOR_ID = 3866083195;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaDice";
    static classType = "constructor";

    emoticon!: string;

    constructor(args: { emoticon?: string } = {}) {
        super();
        this.emoticon = args.emoticon!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3866083195, false);
        writer.tgWriteString(this.emoticon);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaDice {
        const args: any = {};
        const _emoticon = reader.tgReadString();
        args.emoticon = _emoticon;
        return new InputMediaDice(args);
    }
}