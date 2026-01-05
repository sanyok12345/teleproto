import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDataJSON } from "../../types/TypeDataJSON";

export class AcceptTermsOfService extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4000511898;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "help.AcceptTermsOfService";
    static classType = "request";

    id?: TypeDataJSON;

    constructor(args: { id?: TypeDataJSON } = {}) {
        super();
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4000511898, false);
        writer.write(this.id!.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AcceptTermsOfService {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        return new AcceptTermsOfService(args);
    }
}