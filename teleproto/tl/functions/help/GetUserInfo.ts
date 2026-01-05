import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUserInfo } from "../../types/help/TypeUserInfo";

export class GetUserInfo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 59377875;
    static SUBCLASS_OF_ID = 1548998616;
    static className = "help.GetUserInfo";
    static classType = "request";

    userId!: EntityLike;

    constructor(args: { userId?: EntityLike } = {}) {
        super();
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(59377875, false);
        writer.write((this.userId as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUserInfo {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetUserInfo {
        const args: any = {};
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new GetUserInfo(args);
    }
}