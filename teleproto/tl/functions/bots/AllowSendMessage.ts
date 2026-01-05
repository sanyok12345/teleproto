import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class AllowSendMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4046644207;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "bots.AllowSendMessage";
    static classType = "request";

    bot?: EntityLike;

    constructor(args: { bot?: EntityLike } = {}) {
        super();
        this.bot = args.bot;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4046644207, false);
        writer.write((this.bot! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AllowSendMessage {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        return new AllowSendMessage(args);
    }
}