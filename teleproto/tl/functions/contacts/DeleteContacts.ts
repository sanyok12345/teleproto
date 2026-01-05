import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class DeleteContacts extends MTProtoRequest {
    static CONSTRUCTOR_ID = 157945344;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "contacts.DeleteContacts";
    static classType = "request";

    id?: EntityLike[];

    constructor(args: { id?: EntityLike[] } = {}) {
        super();
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(157945344, false);
        writer.writeVector(this.id!, (item) => {
            writer.write((item as any).getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteContacts {
        const args: any = {};
        const _id = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.id = _id;
        return new DeleteContacts(args);
    }
}