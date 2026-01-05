import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class KeyboardButtonGame extends TLObject {
    static CONSTRUCTOR_ID = 1358175439;
    static SUBCLASS_OF_ID = 195916963;
    static className = "KeyboardButtonGame";
    static classType = "constructor";

    text!: string;

    constructor(args: { text?: string } = {}) {
        super();
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1358175439, false);
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButtonGame {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        return new KeyboardButtonGame(args);
    }
}