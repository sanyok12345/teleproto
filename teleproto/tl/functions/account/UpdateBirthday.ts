import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeBirthday } from "../../types/TypeBirthday";

export class UpdateBirthday extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3429764113;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.UpdateBirthday";
    static classType = "request";

    flags?: number;
    birthday?: TypeBirthday;

    constructor(args: { flags?: number, birthday?: TypeBirthday } = {}) {
        super();
        this.flags = args.flags;
        this.birthday = args.birthday;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3429764113, false);
        let flags = 0;
        if (this.birthday !== undefined && this.birthday !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.birthday !== undefined && this.birthday !== null) {
            writer.write(this.birthday.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateBirthday {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _birthday = reader.tgReadObject();
            args.birthday = _birthday;
        } else {
            args.birthday = undefined;
        }
        return new UpdateBirthday(args);
    }
}