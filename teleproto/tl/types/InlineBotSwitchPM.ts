import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InlineBotSwitchPM extends TLObject {
    static CONSTRUCTOR_ID = 1008755359;
    static SUBCLASS_OF_ID = 2192701243;
    static className = "InlineBotSwitchPM";
    static classType = "constructor";

    text!: string;
    startParam!: string;

    constructor(args: { text?: string, startParam?: string } = {}) {
        super();
        this.text = args.text!;
        this.startParam = args.startParam!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1008755359, false);
        writer.tgWriteString(this.text);
        writer.tgWriteString(this.startParam);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InlineBotSwitchPM {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        const _startParam = reader.tgReadString();
        args.startParam = _startParam;
        return new InlineBotSwitchPM(args);
    }
}