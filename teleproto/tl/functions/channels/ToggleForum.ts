import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ToggleForum extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1073174324;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.ToggleForum";
    static classType = "request";

    channel?: EntityLike;
    enabled!: boolean;
    tabs!: boolean;

    constructor(args: { channel?: EntityLike, enabled?: boolean, tabs?: boolean } = {}) {
        super();
        this.channel = args.channel;
        this.enabled = args.enabled!;
        this.tabs = args.tabs!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1073174324, false);
        writer.write((this.channel! as any).getBytes());
        writer.tgWriteBool(this.enabled);
        writer.tgWriteBool(this.tabs);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleForum {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _enabled = reader.tgReadBool();
        args.enabled = _enabled;
        const _tabs = reader.tgReadBool();
        args.tabs = _tabs;
        return new ToggleForum(args);
    }
}