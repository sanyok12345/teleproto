import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeResolvedPeer } from "../../types/contacts/TypeResolvedPeer";

export class ResolvePhone extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2331591492;
    static SUBCLASS_OF_ID = 4033196968;
    static className = "contacts.ResolvePhone";
    static classType = "request";

    phone!: string;

    constructor(args: { phone?: string } = {}) {
        super();
        this.phone = args.phone!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2331591492, false);
        writer.tgWriteString(this.phone);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeResolvedPeer {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ResolvePhone {
        const args: any = {};
        const _phone = reader.tgReadString();
        args.phone = _phone;
        return new ResolvePhone(args);
    }
}