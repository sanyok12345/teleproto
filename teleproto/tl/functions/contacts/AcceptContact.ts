import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class AcceptContact extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4164002319;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "contacts.AcceptContact";
    static classType = "request";

    id?: EntityLike;

    constructor(args: { id?: EntityLike } = {}) {
        super();
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4164002319, false);
        writer.write((this.id! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AcceptContact {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        return new AcceptContact(args);
    }
}