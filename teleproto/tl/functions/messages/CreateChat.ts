import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInvitedUsers } from "../../types/messages/TypeInvitedUsers";

export class CreateChat extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2463030740;
    static SUBCLASS_OF_ID = 1035899041;
    static className = "messages.CreateChat";
    static classType = "request";

    flags?: number;
    users!: EntityLike[];
    title!: string;
    ttlPeriod?: number;

    constructor(args: { flags?: number, users?: EntityLike[], title?: string, ttlPeriod?: number } = {}) {
        super();
        this.flags = args.flags;
        this.users = args.users!;
        this.title = args.title!;
        this.ttlPeriod = args.ttlPeriod;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2463030740, false);
        let flags = 0;
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeVector(this.users, (item) => {
            writer.write((item as any).getBytes());
        });
        writer.tgWriteString(this.title);
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) {
            writer.writeInt(this.ttlPeriod);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeInvitedUsers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CreateChat {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        const _title = reader.tgReadString();
        args.title = _title;
        if (args.flags & (1 << 0)) {
            const _ttlPeriod = reader.readInt();
            args.ttlPeriod = _ttlPeriod;
        } else {
            args.ttlPeriod = undefined;
        }
        return new CreateChat(args);
    }
}