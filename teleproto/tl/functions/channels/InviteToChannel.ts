import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInvitedUsers } from "../../types/messages/TypeInvitedUsers";

export class InviteToChannel extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3387112788;
    static SUBCLASS_OF_ID = 1035899041;
    static className = "channels.InviteToChannel";
    static classType = "request";

    channel?: EntityLike;
    users!: EntityLike[];

    constructor(args: { channel?: EntityLike, users?: EntityLike[] } = {}) {
        super();
        this.channel = args.channel;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3387112788, false);
        writer.write((this.channel! as any).getBytes());
        writer.writeVector(this.users, (item) => {
            writer.write((item as any).getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeInvitedUsers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InviteToChannel {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new InviteToChannel(args);
    }
}