import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeBoostsList } from "../../types/premium/TypeBoostsList";

export class GetUserBoosts extends MTProtoRequest {
    static CONSTRUCTOR_ID = 965037343;
    static SUBCLASS_OF_ID = 573941949;
    static className = "premium.GetUserBoosts";
    static classType = "request";

    peer?: EntityLike;
    userId!: EntityLike;

    constructor(args: { peer?: EntityLike, userId?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(965037343, false);
        writer.write((this.peer! as any).getBytes());
        writer.write((this.userId as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBoostsList {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetUserBoosts {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new GetUserBoosts(args);
    }
}