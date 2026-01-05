import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPhoneCall } from "../../types/TypeInputPhoneCall";
import { TypePhoneCallProtocol } from "../../types/TypePhoneCallProtocol";
import { TypePhoneCall } from "../../types/phone/TypePhoneCall";

export class AcceptCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1003664544;
    static SUBCLASS_OF_ID = 3565878863;
    static className = "phone.AcceptCall";
    static classType = "request";

    peer?: TypeInputPhoneCall;
    gB!: Buffer;
    protocol!: TypePhoneCallProtocol;

    constructor(args: { peer?: TypeInputPhoneCall, gB?: Buffer, protocol?: TypePhoneCallProtocol } = {}) {
        super();
        this.peer = args.peer;
        this.gB = args.gB!;
        this.protocol = args.protocol!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1003664544, false);
        writer.write(this.peer!.getBytes());
        writer.tgWriteBytes(this.gB);
        writer.write(this.protocol.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePhoneCall {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AcceptCall {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _gB = reader.tgReadBytes();
        args.gB = _gB;
        const _protocol = reader.tgReadObject();
        args.protocol = _protocol;
        return new AcceptCall(args);
    }
}