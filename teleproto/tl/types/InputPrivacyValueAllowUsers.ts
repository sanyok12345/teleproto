import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputUser } from "./TypeInputUser";

export class InputPrivacyValueAllowUsers extends TLObject {
    static CONSTRUCTOR_ID = 320652927;
    static SUBCLASS_OF_ID = 1513843490;
    static className = "InputPrivacyValueAllowUsers";
    static classType = "constructor";

    users!: TypeInputUser[];

    constructor(args: { users?: TypeInputUser[] } = {}) {
        super();
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(320652927, false);
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyValueAllowUsers {
        const args: any = {};
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new InputPrivacyValueAllowUsers(args);
    }
}