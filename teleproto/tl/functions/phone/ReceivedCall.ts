import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPhoneCall } from "../../types/TypeInputPhoneCall";

export class ReceivedCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 399855457;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "phone.ReceivedCall";
    static classType = "request";

    peer?: TypeInputPhoneCall;

    constructor(args: { peer?: TypeInputPhoneCall } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(399855457, false);
        writer.write(this.peer!.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReceivedCall {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new ReceivedCall(args);
    }
}