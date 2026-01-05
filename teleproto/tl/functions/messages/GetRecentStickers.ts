import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeRecentStickers } from "../../types/messages/TypeRecentStickers";

export class GetRecentStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2645114939;
    static SUBCLASS_OF_ID = 4151281283;
    static className = "messages.GetRecentStickers";
    static classType = "request";

    flags?: number;
    attached?: boolean;
    hash?: bigint;

    constructor(args: { flags?: number, attached?: boolean, hash?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.attached = args.attached;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2645114939, false);
        let flags = 0;
        if (this.attached) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.attached !== undefined && this.attached !== null) {
        }
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeRecentStickers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetRecentStickers {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _attached = true;
            args.attached = _attached;
        } else {
            args.attached = false;
        }
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetRecentStickers(args);
    }
}