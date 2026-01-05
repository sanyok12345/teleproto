import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypePaymentReceipt } from "../../types/payments/TypePaymentReceipt";

export class GetPaymentReceipt extends MTProtoRequest {
    static CONSTRUCTOR_ID = 611897804;
    static SUBCLASS_OF_ID = 1493210057;
    static className = "payments.GetPaymentReceipt";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike;

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(611897804, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePaymentReceipt {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPaymentReceipt {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new GetPaymentReceipt(args);
    }
}