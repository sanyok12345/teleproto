import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeUser } from "../TypeUser";

export class Users extends TLObject {
    static CONSTRUCTOR_ID = 1658259128;
    static SUBCLASS_OF_ID = 4065063104;
    static className = "users.Users";
    static classType = "constructor";

    users!: TypeUser[];

    constructor(args: { users?: TypeUser[] } = {}) {
        super();
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1658259128, false);
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Users {
        const args: any = {};
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new Users(args);
    }
}