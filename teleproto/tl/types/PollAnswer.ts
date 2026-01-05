import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class PollAnswer extends TLObject {
    static CONSTRUCTOR_ID = 4279689930;
    static SUBCLASS_OF_ID = 2124799390;
    static className = "PollAnswer";
    static classType = "constructor";

    text!: TypeTextWithEntities;
    option!: Buffer;

    constructor(args: { text?: TypeTextWithEntities, option?: Buffer } = {}) {
        super();
        this.text = args.text!;
        this.option = args.option!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4279689930, false);
        writer.write(this.text.getBytes());
        writer.tgWriteBytes(this.option);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PollAnswer {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        const _option = reader.tgReadBytes();
        args.option = _option;
        return new PollAnswer(args);
    }
}