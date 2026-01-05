import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputStorePaymentPurpose } from "../../types/TypeInputStorePaymentPurpose";
import { TypeUpdates } from "../../types/TypeUpdates";

export class AssignAppStoreTransaction extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2163045501;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "payments.AssignAppStoreTransaction";
    static classType = "request";

    receipt!: Buffer;
    purpose!: TypeInputStorePaymentPurpose;

    constructor(args: { receipt?: Buffer, purpose?: TypeInputStorePaymentPurpose } = {}) {
        super();
        this.receipt = args.receipt!;
        this.purpose = args.purpose!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2163045501, false);
        writer.tgWriteBytes(this.receipt);
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

    static fromReader(reader: BinaryReader): AssignAppStoreTransaction {
        const args: any = {};
        const _receipt = reader.tgReadBytes();
        args.receipt = _receipt;
        const _purpose = reader.tgReadObject();
        args.purpose = _purpose;
        return new AssignAppStoreTransaction(args);
    }
}