import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSentCode } from "./auth/TypeSentCode";

export class UpdateSentPhoneCode extends TLObject {
    static CONSTRUCTOR_ID = 1347068303;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateSentPhoneCode";
    static classType = "constructor";

    sentCode!: TypeSentCode;

    constructor(args: { sentCode?: TypeSentCode } = {}) {
        super();
        this.sentCode = args.sentCode!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1347068303, false);
        writer.write(this.sentCode.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateSentPhoneCode {
        const args: any = {};
        const _sentCode = reader.tgReadObject();
        args.sentCode = _sentCode;
        return new UpdateSentPhoneCode(args);
    }
}