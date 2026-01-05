import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class RestrictSponsoredMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2598966553;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.RestrictSponsoredMessages";
    static classType = "request";

    channel?: EntityLike;
    restricted!: boolean;

    constructor(args: { channel?: EntityLike, restricted?: boolean } = {}) {
        super();
        this.channel = args.channel;
        this.restricted = args.restricted!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2598966553, false);
        writer.write((this.channel! as any).getBytes());
        writer.tgWriteBool(this.restricted);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RestrictSponsoredMessages {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _restricted = reader.tgReadBool();
        args.restricted = _restricted;
        return new RestrictSponsoredMessages(args);
    }
}