import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUser } from "../../types/TypeUser";

export class GetUsers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 227648840;
    static SUBCLASS_OF_ID = 67557965;
    static className = "users.GetUsers";
    static classType = "request";

    id?: EntityLike[];

    constructor(args: { id?: EntityLike[] } = {}) {
        super();
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(227648840, false);
        writer.writeVector(this.id!, (item) => {
            writer.write((item as any).getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUser[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetUsers {
        const args: any = {};
        const _id = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.id = _id;
        return new GetUsers(args);
    }
}