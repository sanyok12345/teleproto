import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputStorePaymentPurpose } from "../../types/TypeInputStorePaymentPurpose";

export class CanPurchaseStore extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1339842215;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "payments.CanPurchaseStore";
    static classType = "request";

    purpose!: TypeInputStorePaymentPurpose;

    constructor(args: { purpose?: TypeInputStorePaymentPurpose } = {}) {
        super();
        this.purpose = args.purpose!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1339842215, false);
        writer.write(this.purpose.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CanPurchaseStore {
        const args: any = {};
        const _purpose = reader.tgReadObject();
        args.purpose = _purpose;
        return new CanPurchaseStore(args);
    }
}