import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeAuthorization } from "../auth/TypeAuthorization";

export class SentCodeSuccess extends TLObject {
    static CONSTRUCTOR_ID = 596704836;
    static SUBCLASS_OF_ID = 1827172481;
    static className = "auth.SentCodeSuccess";
    static classType = "constructor";

    authorization!: TypeAuthorization;

    constructor(args: { authorization?: TypeAuthorization } = {}) {
        super();
        this.authorization = args.authorization!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(596704836, false);
        writer.write(this.authorization.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCodeSuccess {
        const args: any = {};
        const _authorization = reader.tgReadObject();
        args.authorization = _authorization;
        return new SentCodeSuccess(args);
    }
}