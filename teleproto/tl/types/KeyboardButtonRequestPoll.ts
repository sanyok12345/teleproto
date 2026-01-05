import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class KeyboardButtonRequestPoll extends TLObject {
    static CONSTRUCTOR_ID = 3150401885;
    static SUBCLASS_OF_ID = 195916963;
    static className = "KeyboardButtonRequestPoll";
    static classType = "constructor";

    flags!: number;
    quiz?: boolean;
    text!: string;

    constructor(args: { flags?: number, quiz?: boolean, text?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.quiz = args.quiz;
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3150401885, false);
        let flags = 0;
        if (this.quiz !== undefined && this.quiz !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.quiz !== undefined && this.quiz !== null) {
            writer.tgWriteBool(this.quiz);
        }
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButtonRequestPoll {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _quiz = reader.tgReadBool();
            args.quiz = _quiz;
        } else {
            args.quiz = undefined;
        }
        const _text = reader.tgReadString();
        args.text = _text;
        return new KeyboardButtonRequestPoll(args);
    }
}