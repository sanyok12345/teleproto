import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class UpdateUsername extends MTProtoRequest {
    static CONSTRUCTOR_ID = 890549214;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "channels.UpdateUsername";
    static classType = "request";

    channel?: EntityLike;
    username!: string;

    constructor(args: { channel?: EntityLike, username?: string } = {}) {
        super();
        this.channel = args.channel;
        this.username = args.username!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(890549214, false);
        writer.write((this.channel! as any).getBytes());
        writer.tgWriteString(this.username);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateUsername {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _username = reader.tgReadString();
        args.username = _username;
        return new UpdateUsername(args);
    }
}