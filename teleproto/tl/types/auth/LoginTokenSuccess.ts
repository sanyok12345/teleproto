import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeAuthorization } from "../auth/TypeAuthorization";

export class LoginTokenSuccess extends TLObject {
    static CONSTRUCTOR_ID = 957176926;
    static SUBCLASS_OF_ID = 1800795702;
    static className = "auth.LoginTokenSuccess";
    static classType = "constructor";

    authorization!: TypeAuthorization;

    constructor(args: { authorization?: TypeAuthorization } = {}) {
        super();
        this.authorization = args.authorization!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(957176926, false);
        writer.write(this.authorization.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): LoginTokenSuccess {
        const args: any = {};
        const _authorization = reader.tgReadObject();
        args.authorization = _authorization;
        return new LoginTokenSuccess(args);
    }
}