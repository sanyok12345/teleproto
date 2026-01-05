import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeTextWithEntities } from "../../types/TypeTextWithEntities";

export class UpdateContactNote extends MTProtoRequest {
    static CONSTRUCTOR_ID = 329212923;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "contacts.UpdateContactNote";
    static classType = "request";

    id?: EntityLike;
    note!: TypeTextWithEntities;

    constructor(args: { id?: EntityLike, note?: TypeTextWithEntities } = {}) {
        super();
        this.id = args.id;
        this.note = args.note!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(329212923, false);
        writer.write((this.id! as any).getBytes());
        writer.write(this.note.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateContactNote {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        const _note = reader.tgReadObject();
        args.note = _note;
        return new UpdateContactNote(args);
    }
}