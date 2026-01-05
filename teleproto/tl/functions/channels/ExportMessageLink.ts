import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeExportedMessageLink } from "../../types/TypeExportedMessageLink";

export class ExportMessageLink extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3862932971;
    static SUBCLASS_OF_ID = 3739632844;
    static className = "channels.ExportMessageLink";
    static classType = "request";

    flags?: number;
    grouped?: boolean;
    thread?: boolean;
    channel?: EntityLike;
    id?: number;

    constructor(args: { flags?: number, grouped?: boolean, thread?: boolean, channel?: EntityLike, id?: number } = {}) {
        super();
        this.flags = args.flags;
        this.grouped = args.grouped;
        this.thread = args.thread;
        this.channel = args.channel;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3862932971, false);
        let flags = 0;
        if (this.grouped) { flags |= 1 << 0; }
        if (this.thread) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.grouped !== undefined && this.grouped !== null) {
        }
        if (this.thread !== undefined && this.thread !== null) {
        }
        writer.write((this.channel! as any).getBytes());
        writer.writeInt(this.id!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedMessageLink {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ExportMessageLink {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _grouped = true;
            args.grouped = _grouped;
        } else {
            args.grouped = false;
        }
        if (args.flags & (1 << 1)) {
            const _thread = true;
            args.thread = _thread;
        } else {
            args.thread = false;
        }
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _id = reader.readInt();
        args.id = _id;
        return new ExportMessageLink(args);
    }
}