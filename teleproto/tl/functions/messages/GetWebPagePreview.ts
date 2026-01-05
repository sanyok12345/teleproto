import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeMessageEntity } from "../../types/TypeMessageEntity";
import { TypeWebPagePreview } from "../../types/messages/TypeWebPagePreview";

export class GetWebPagePreview extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1460498287;
    static SUBCLASS_OF_ID = 3801354434;
    static className = "messages.GetWebPagePreview";
    static classType = "request";

    flags?: number;
    message!: string;
    entities?: TypeMessageEntity[];

    constructor(args: { flags?: number, message?: string, entities?: TypeMessageEntity[] } = {}) {
        super();
        this.flags = args.flags;
        this.message = args.message!;
        this.entities = args.entities;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1460498287, false);
        let flags = 0;
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.message);
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeWebPagePreview {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetWebPagePreview {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _message = reader.tgReadString();
        args.message = _message;
        if (args.flags & (1 << 3)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        return new GetWebPagePreview(args);
    }
}