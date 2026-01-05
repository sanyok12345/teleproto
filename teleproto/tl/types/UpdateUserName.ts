import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeUsername } from "./TypeUsername";

export class UpdateUserName extends TLObject {
    static CONSTRUCTOR_ID = 2810480932;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateUserName";
    static classType = "constructor";

    userId!: bigint;
    firstName!: string;
    lastName!: string;
    usernames!: TypeUsername[];

    constructor(args: { userId?: bigint, firstName?: string, lastName?: string, usernames?: TypeUsername[] } = {}) {
        super();
        this.userId = args.userId!;
        this.firstName = args.firstName!;
        this.lastName = args.lastName!;
        this.usernames = args.usernames!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2810480932, false);
        writer.writeLargeInt(this.userId, 64);
        writer.tgWriteString(this.firstName);
        writer.tgWriteString(this.lastName);
        writer.writeVector(this.usernames, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateUserName {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _firstName = reader.tgReadString();
        args.firstName = _firstName;
        const _lastName = reader.tgReadString();
        args.lastName = _lastName;
        const _usernames = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.usernames = _usernames;
        return new UpdateUserName(args);
    }
}