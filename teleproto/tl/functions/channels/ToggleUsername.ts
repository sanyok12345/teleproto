import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ToggleUsername extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1358053637;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "channels.ToggleUsername";
    static classType = "request";

    channel?: EntityLike;
    username!: string;
    active!: boolean;

    constructor(args: { channel?: EntityLike, username?: string, active?: boolean } = {}) {
        super();
        this.channel = args.channel;
        this.username = args.username!;
        this.active = args.active!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1358053637, false);
        writer.write((this.channel! as any).getBytes());
        writer.tgWriteString(this.username);
        writer.tgWriteBool(this.active);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleUsername {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _username = reader.tgReadString();
        args.username = _username;
        const _active = reader.tgReadBool();
        args.active = _active;
        return new ToggleUsername(args);
    }
}