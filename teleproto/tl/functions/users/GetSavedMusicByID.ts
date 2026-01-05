import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputDocument } from "../../types/TypeInputDocument";
import { TypeSavedMusic } from "../../types/users/TypeSavedMusic";

export class GetSavedMusicByID extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1970513129;
    static SUBCLASS_OF_ID = 4162039351;
    static className = "users.GetSavedMusicByID";
    static classType = "request";

    id?: EntityLike;
    documents!: TypeInputDocument[];

    constructor(args: { id?: EntityLike, documents?: TypeInputDocument[] } = {}) {
        super();
        this.id = args.id;
        this.documents = args.documents!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1970513129, false);
        writer.write((this.id! as any).getBytes());
        writer.writeVector(this.documents, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSavedMusic {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSavedMusicByID {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        const _documents = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.documents = _documents;
        return new GetSavedMusicByID(args);
    }
}