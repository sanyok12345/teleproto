import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeBankCardData } from "../../types/payments/TypeBankCardData";

export class GetBankCardData extends MTProtoRequest {
    static CONSTRUCTOR_ID = 779736953;
    static SUBCLASS_OF_ID = 2356008587;
    static className = "payments.GetBankCardData";
    static classType = "request";

    number!: string;

    constructor(args: { number?: string } = {}) {
        super();
        this.number = args.number!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(779736953, false);
        writer.tgWriteString(this.number);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBankCardData {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBankCardData {
        const args: any = {};
        const _number = reader.tgReadString();
        args.number = _number;
        return new GetBankCardData(args);
    }
}