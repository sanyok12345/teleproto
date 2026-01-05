import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeUser } from "../TypeUser";

export class UsersSlice extends TLObject {
    static CONSTRUCTOR_ID = 828000628;
    static SUBCLASS_OF_ID = 4065063104;
    static className = "users.UsersSlice";
    static classType = "constructor";

    count!: number;
    users!: TypeUser[];

    constructor(args: { count?: number, users?: TypeUser[] } = {}) {
        super();
        this.count = args.count!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(828000628, false);
        writer.writeInt(this.count);
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UsersSlice {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new UsersSlice(args);
    }
}