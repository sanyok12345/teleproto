import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDocument } from "../../types/TypeDocument";

export class GetCustomEmojiDocuments extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3651866452;
    static SUBCLASS_OF_ID = 3428388360;
    static className = "messages.GetCustomEmojiDocuments";
    static classType = "request";

    documentId!: bigint[];

    constructor(args: { documentId?: bigint[] } = {}) {
        super();
        this.documentId = args.documentId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3651866452, false);
        writer.writeVector(this.documentId, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDocument[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetCustomEmojiDocuments {
        const args: any = {};
        const _documentId = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.documentId = _documentId;
        return new GetCustomEmojiDocuments(args);
    }
}