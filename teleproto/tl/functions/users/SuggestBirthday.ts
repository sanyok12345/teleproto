import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeBirthday } from "../../types/TypeBirthday";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SuggestBirthday extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4233311090;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "users.SuggestBirthday";
    static classType = "request";

    id?: EntityLike;
    birthday!: TypeBirthday;

    constructor(args: { id?: EntityLike, birthday?: TypeBirthday } = {}) {
        super();
        this.id = args.id;
        this.birthday = args.birthday!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4233311090, false);
        writer.write((this.id! as any).getBytes());
        writer.write(this.birthday.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SuggestBirthday {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        const _birthday = reader.tgReadObject();
        args.birthday = _birthday;
        return new SuggestBirthday(args);
    }
}