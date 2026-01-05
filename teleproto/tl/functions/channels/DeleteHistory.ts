import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class DeleteHistory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2611648071;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.DeleteHistory";
    static classType = "request";

    flags?: number;
    forEveryone?: boolean;
    channel?: EntityLike;
    maxId?: number;

    constructor(args: { flags?: number, forEveryone?: boolean, channel?: EntityLike, maxId?: number } = {}) {
        super();
        this.flags = args.flags;
        this.forEveryone = args.forEveryone;
        this.channel = args.channel;
        this.maxId = args.maxId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2611648071, false);
        let flags = 0;
        if (this.forEveryone) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.forEveryone !== undefined && this.forEveryone !== null) {
        }
        writer.write((this.channel! as any).getBytes());
        writer.writeInt(this.maxId!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteHistory {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _forEveryone = true;
            args.forEveryone = _forEveryone;
        } else {
            args.forEveryone = false;
        }
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        return new DeleteHistory(args);
    }
}