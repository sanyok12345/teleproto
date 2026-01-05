import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDocument } from "../../types/TypeInputDocument";

export class FaveSticker extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3120547163;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.FaveSticker";
    static classType = "request";

    id?: TypeInputDocument;
    unfave!: boolean;

    constructor(args: { id?: TypeInputDocument, unfave?: boolean } = {}) {
        super();
        this.id = args.id;
        this.unfave = args.unfave!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3120547163, false);
        writer.write(this.id!.getBytes());
        writer.tgWriteBool(this.unfave);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): FaveSticker {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        const _unfave = reader.tgReadBool();
        args.unfave = _unfave;
        return new FaveSticker(args);
    }
}