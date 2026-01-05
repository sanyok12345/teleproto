import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class JoinChannel extends MTProtoRequest {
    static CONSTRUCTOR_ID = 615851205;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.JoinChannel";
    static classType = "request";

    channel?: EntityLike;

    constructor(args: { channel?: EntityLike } = {}) {
        super();
        this.channel = args.channel;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(615851205, false);
        writer.write((this.channel! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): JoinChannel {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        return new JoinChannel(args);
    }
}