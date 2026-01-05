import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeBotMenuButton } from "../../types/TypeBotMenuButton";

export class GetBotMenuButton extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2623597352;
    static SUBCLASS_OF_ID = 1282522428;
    static className = "bots.GetBotMenuButton";
    static classType = "request";

    userId!: EntityLike;

    constructor(args: { userId?: EntityLike } = {}) {
        super();
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2623597352, false);
        writer.write((this.userId as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBotMenuButton {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBotMenuButton {
        const args: any = {};
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new GetBotMenuButton(args);
    }
}