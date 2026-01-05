import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class SendMessageTextDraftAction extends TLObject {
    static CONSTRUCTOR_ID = 929929052;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageTextDraftAction";
    static classType = "constructor";

    randomId!: bigint;
    text!: TypeTextWithEntities;

    constructor(args: { randomId?: bigint, text?: TypeTextWithEntities } = {}) {
        super();
        this.randomId = args.randomId!;
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(929929052, false);
        writer.writeLargeInt(this.randomId, 64);
        writer.write(this.text.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageTextDraftAction {
        const args: any = {};
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        const _text = reader.tgReadObject();
        args.text = _text;
        return new SendMessageTextDraftAction(args);
    }
}