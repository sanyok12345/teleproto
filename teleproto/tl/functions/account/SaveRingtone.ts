import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDocument } from "../../types/TypeInputDocument";
import { TypeSavedRingtone } from "../../types/account/TypeSavedRingtone";

export class SaveRingtone extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1038768899;
    static SUBCLASS_OF_ID = 2984412196;
    static className = "account.SaveRingtone";
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
        writer.writeInt(1038768899, false);
        writer.write(this.id!.getBytes());
        writer.tgWriteBool(this.unsave);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSavedRingtone {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveRingtone {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        const _unsave = reader.tgReadBool();
        args.unsave = _unsave;
        return new SaveRingtone(args);
    }
}