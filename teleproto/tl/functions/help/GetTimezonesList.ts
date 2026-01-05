import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeTimezonesList } from "../../types/help/TypeTimezonesList";

export class GetTimezonesList extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1236468288;
    static SUBCLASS_OF_ID = 3396789365;
    static className = "help.GetTimezonesList";
    static classType = "request";

    hash?: number;

    constructor(args: { hash?: number } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1236468288, false);
        writer.writeInt(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeTimezonesList {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetTimezonesList {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        return new GetTimezonesList(args);
    }
}