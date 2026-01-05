import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class DeactivateAllUsernames extends MTProtoRequest {
    static CONSTRUCTOR_ID = 170155475;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "channels.DeactivateAllUsernames";
    static classType = "request";

    channel?: EntityLike;

    constructor(args: { channel?: EntityLike } = {}) {
        super();
        this.channel = args.channel;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(170155475, false);
        writer.write((this.channel! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeactivateAllUsernames {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        return new DeactivateAllUsernames(args);
    }
}