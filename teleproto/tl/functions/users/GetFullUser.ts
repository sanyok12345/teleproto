import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUserFull } from "../../types/users/TypeUserFull";

export class GetFullUser extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3054459160;
    static SUBCLASS_OF_ID = 2212470261;
    static className = "users.GetFullUser";
    static classType = "request";

    id?: EntityLike;

    constructor(args: { id?: EntityLike } = {}) {
        super();
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3054459160, false);
        writer.write((this.id! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUserFull {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetFullUser {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        return new GetFullUser(args);
    }
}