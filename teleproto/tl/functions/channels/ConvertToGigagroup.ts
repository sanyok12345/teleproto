import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ConvertToGigagroup extends MTProtoRequest {
    static CONSTRUCTOR_ID = 187239529;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.ConvertToGigagroup";
    static classType = "request";

    channel?: EntityLike;

    constructor(args: { channel?: EntityLike } = {}) {
        super();
        this.channel = args.channel;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(187239529, false);
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

    static fromReader(reader: BinaryReader): ConvertToGigagroup {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        return new ConvertToGigagroup(args);
    }
}