import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ClearRecentStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2308530221;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ClearRecentStickers";
    static classType = "request";

    flags?: number;
    attached?: boolean;

    constructor(args: { flags?: number, attached?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.attached = args.attached;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2308530221, false);
        let flags = 0;
        if (this.attached) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.attached !== undefined && this.attached !== null) {
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ClearRecentStickers {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _attached = true;
            args.attached = _attached;
        } else {
            args.attached = false;
        }
        return new ClearRecentStickers(args);
    }
}