import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDocument } from "../../types/TypeInputDocument";

export class SaveRecentSticker extends MTProtoRequest {
    static CONSTRUCTOR_ID = 958863608;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SaveRecentSticker";
    static classType = "request";

    flags?: number;
    attached?: boolean;
    id?: TypeInputDocument;
    unsave!: boolean;

    constructor(args: { flags?: number, attached?: boolean, id?: TypeInputDocument, unsave?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.attached = args.attached;
        this.id = args.id;
        this.unsave = args.unsave!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(958863608, false);
        let flags = 0;
        if (this.attached) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.attached !== undefined && this.attached !== null) {
        }
        writer.write(this.id!.getBytes());
        writer.tgWriteBool(this.unsave);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveRecentSticker {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _attached = true;
            args.attached = _attached;
        } else {
            args.attached = false;
        }
        const _id = reader.tgReadObject();
        args.id = _id;
        const _unsave = reader.tgReadBool();
        args.unsave = _unsave;
        return new SaveRecentSticker(args);
    }
}