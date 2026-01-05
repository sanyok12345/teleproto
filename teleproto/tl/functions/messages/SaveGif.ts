import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDocument } from "../../types/TypeInputDocument";

export class SaveGif extends MTProtoRequest {
    static CONSTRUCTOR_ID = 846868683;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SaveGif";
    static classType = "request";

    id?: TypeInputDocument;
    unsave!: boolean;

    constructor(args: { id?: TypeInputDocument, unsave?: boolean } = {}) {
        super();
        this.id = args.id;
        this.unsave = args.unsave!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(846868683, false);
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

    static fromReader(reader: BinaryReader): SaveGif {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        const _unsave = reader.tgReadBool();
        args.unsave = _unsave;
        return new SaveGif(args);
    }
}