import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendConferenceCallBroadcast extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3329235200;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.SendConferenceCallBroadcast";
    static classType = "request";

    call!: TypeInputGroupCall;
    block!: Buffer;

    constructor(args: { call?: TypeInputGroupCall, block?: Buffer } = {}) {
        super();
        this.call = args.call!;
        this.block = args.block!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3329235200, false);
        writer.write(this.call.getBytes());
        writer.tgWriteBytes(this.block);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendConferenceCallBroadcast {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _block = reader.tgReadBytes();
        args.block = _block;
        return new SendConferenceCallBroadcast(args);
    }
}