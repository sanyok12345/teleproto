import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class CanSendMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 324662502;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.CanSendMessage";
    static classType = "request";

    bot?: EntityLike;

    constructor(args: { bot?: EntityLike } = {}) {
        super();
        this.bot = args.bot;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(324662502, false);
        writer.write((this.bot! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CanSendMessage {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        return new CanSendMessage(args);
    }
}