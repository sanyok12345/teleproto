import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypePaidMessagesRevenue } from "../../types/account/TypePaidMessagesRevenue";

export class GetPaidMessagesRevenue extends MTProtoRequest {
    static CONSTRUCTOR_ID = 431639143;
    static SUBCLASS_OF_ID = 355404887;
    static className = "account.GetPaidMessagesRevenue";
    static classType = "request";

    flags?: number;
    parentPeer?: EntityLike;
    userId!: EntityLike;

    constructor(args: { flags?: number, parentPeer?: EntityLike, userId?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.parentPeer = args.parentPeer;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(431639143, false);
        let flags = 0;
        if (this.parentPeer !== undefined && this.parentPeer !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.parentPeer !== undefined && this.parentPeer !== null) {
            writer.write((this.parentPeer as any).getBytes());
        }
        writer.write((this.userId as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePaidMessagesRevenue {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPaidMessagesRevenue {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _parentPeer = reader.tgReadObject();
            args.parentPeer = _parentPeer;
        } else {
            args.parentPeer = undefined;
        }
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new GetPaidMessagesRevenue(args);
    }
}