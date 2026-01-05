import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeConnectedStarRefBots } from "../../types/payments/TypeConnectedStarRefBots";

export class GetConnectedStarRefBot extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3084490992;
    static SUBCLASS_OF_ID = 593369703;
    static className = "payments.GetConnectedStarRefBot";
    static classType = "request";

    peer?: EntityLike;
    bot?: EntityLike;

    constructor(args: { peer?: EntityLike, bot?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
        this.bot = args.bot;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3084490992, false);
        writer.write((this.peer! as any).getBytes());
        writer.write((this.bot! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeConnectedStarRefBots {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetConnectedStarRefBot {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        return new GetConnectedStarRefBot(args);
    }
}