import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSponsoredPeers } from "../../types/contacts/TypeSponsoredPeers";

export class GetSponsoredPeers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3066610579;
    static SUBCLASS_OF_ID = 3026017484;
    static className = "contacts.GetSponsoredPeers";
    static classType = "request";

    q!: string;

    constructor(args: { q?: string } = {}) {
        super();
        this.q = args.q!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3066610579, false);
        writer.tgWriteString(this.q);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSponsoredPeers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSponsoredPeers {
        const args: any = {};
        const _q = reader.tgReadString();
        args.q = _q;
        return new GetSponsoredPeers(args);
    }
}