import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDocument } from "../../types/TypeInputDocument";

export class SaveMusic extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2993107625;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.SaveMusic";
    static classType = "request";

    flags?: number;
    unsave?: boolean;
    id?: TypeInputDocument;
    afterId?: TypeInputDocument;

    constructor(args: { flags?: number, unsave?: boolean, id?: TypeInputDocument, afterId?: TypeInputDocument } = {}) {
        super();
        this.flags = args.flags;
        this.unsave = args.unsave;
        this.id = args.id;
        this.afterId = args.afterId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2993107625, false);
        let flags = 0;
        if (this.unsave) { flags |= 1 << 0; }
        if (this.afterId !== undefined && this.afterId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.unsave !== undefined && this.unsave !== null) {
        }
        writer.write(this.id!.getBytes());
        if (this.afterId !== undefined && this.afterId !== null) {
            writer.write(this.afterId.getBytes());
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

    static fromReader(reader: BinaryReader): SaveMusic {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _unsave = true;
            args.unsave = _unsave;
        } else {
            args.unsave = false;
        }
        const _id = reader.tgReadObject();
        args.id = _id;
        if (args.flags & (1 << 1)) {
            const _afterId = reader.tgReadObject();
            args.afterId = _afterId;
        } else {
            args.afterId = undefined;
        }
        return new SaveMusic(args);
    }
}