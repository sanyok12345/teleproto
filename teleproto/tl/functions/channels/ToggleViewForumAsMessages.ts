import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ToggleViewForumAsMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2537077525;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.ToggleViewForumAsMessages";
    static classType = "request";

    channel?: EntityLike;
    enabled!: boolean;

    constructor(args: { channel?: EntityLike, enabled?: boolean } = {}) {
        super();
        this.channel = args.channel;
        this.enabled = args.enabled!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2537077525, false);
        writer.write((this.channel! as any).getBytes());
        writer.tgWriteBool(this.enabled);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleViewForumAsMessages {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _enabled = reader.tgReadBool();
        args.enabled = _enabled;
        return new ToggleViewForumAsMessages(args);
    }
}