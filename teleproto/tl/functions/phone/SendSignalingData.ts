import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPhoneCall } from "../../types/TypeInputPhoneCall";

export class SendSignalingData extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4286223235;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "phone.SendSignalingData";
    static classType = "request";

    peer?: TypeInputPhoneCall;
    data!: Buffer;

    constructor(args: { peer?: TypeInputPhoneCall, data?: Buffer } = {}) {
        super();
        this.peer = args.peer;
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4286223235, false);
        writer.write(this.peer!.getBytes());
        writer.tgWriteBytes(this.data);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendSignalingData {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _data = reader.tgReadBytes();
        args.data = _data;
        return new SendSignalingData(args);
    }
}