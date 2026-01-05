import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePhoneCall } from "../TypePhoneCall";
import { TypeUser } from "../TypeUser";

export class PhoneCall extends TLObject {
    static CONSTRUCTOR_ID = 3968000320;
    static SUBCLASS_OF_ID = 3565878863;
    static className = "phone.PhoneCall";
    static classType = "constructor";

    phoneCall!: TypePhoneCall;
    users!: TypeUser[];

    constructor(args: { phoneCall?: TypePhoneCall, users?: TypeUser[] } = {}) {
        super();
        this.phoneCall = args.phoneCall!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3968000320, false);
        writer.write(this.phoneCall.getBytes());
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneCall {
        const args: any = {};
        const _phoneCall = reader.tgReadObject();
        args.phoneCall = _phoneCall;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new PhoneCall(args);
    }
}