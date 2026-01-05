import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class InviteText extends TLObject {
    static CONSTRUCTOR_ID = 415997816;
    static SUBCLASS_OF_ID = 3480267317;
    static className = "help.InviteText";
    static classType = "constructor";

    message!: string;

    constructor(args: { message?: string } = {}) {
        super();
        this.message = args.message!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(415997816, false);
        writer.tgWriteString(this.message);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InviteText {
        const args: any = {};
        const _message = reader.tgReadString();
        args.message = _message;
        return new InviteText(args);
    }
}