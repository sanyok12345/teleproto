import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeMessageStats } from "../../types/stats/TypeMessageStats";

export class GetMessageStats extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3068175349;
    static SUBCLASS_OF_ID = 2516886306;
    static className = "stats.GetMessageStats";
    static classType = "request";

    flags?: number;
    dark?: boolean;
    channel?: EntityLike;
    msgId?: MessageIDLike;

    constructor(args: { flags?: number, dark?: boolean, channel?: EntityLike, msgId?: MessageIDLike } = {}) {
        super();
        this.flags = args.flags;
        this.dark = args.dark;
        this.channel = args.channel;
        this.msgId = args.msgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3068175349, false);
        let flags = 0;
        if (this.dark) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.dark !== undefined && this.dark !== null) {
        }
        writer.write((this.channel! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessageStats {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetMessageStats {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _dark = true;
            args.dark = _dark;
        } else {
            args.dark = false;
        }
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new GetMessageStats(args);
    }
}