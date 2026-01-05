import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeUser } from "../TypeUser";

export class Support extends TLObject {
    static CONSTRUCTOR_ID = 398898678;
    static SUBCLASS_OF_ID = 1901706475;
    static className = "help.Support";
    static classType = "constructor";

    phoneNumber!: string;
    user!: TypeUser;

    constructor(args: { phoneNumber?: string, user?: TypeUser } = {}) {
        super();
        this.phoneNumber = args.phoneNumber!;
        this.user = args.user!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(398898678, false);
        writer.tgWriteString(this.phoneNumber);
        writer.write(this.user.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Support {
        const args: any = {};
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _user = reader.tgReadObject();
        args.user = _user;
        return new Support(args);
    }
}