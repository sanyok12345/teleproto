import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDataJSON } from "../../types/TypeDataJSON";
import { TypeInputStorePaymentPurpose } from "../../types/TypeInputStorePaymentPurpose";
import { TypeUpdates } from "../../types/TypeUpdates";

export class AssignPlayMarketTransaction extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3757920467;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "payments.AssignPlayMarketTransaction";
    static classType = "request";

    receipt!: TypeDataJSON;
    purpose!: TypeInputStorePaymentPurpose;

    constructor(args: { receipt?: TypeDataJSON, purpose?: TypeInputStorePaymentPurpose } = {}) {
        super();
        this.receipt = args.receipt!;
        this.purpose = args.purpose!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3757920467, false);
        writer.write(this.receipt.getBytes());
        writer.write(this.purpose.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AssignPlayMarketTransaction {
        const args: any = {};
        const _receipt = reader.tgReadObject();
        args.receipt = _receipt;
        const _purpose = reader.tgReadObject();
        args.purpose = _purpose;
        return new AssignPlayMarketTransaction(args);
    }
}