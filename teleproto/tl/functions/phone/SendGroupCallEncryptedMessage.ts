import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";

export class SendGroupCallEncryptedMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3853493613;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "phone.SendGroupCallEncryptedMessage";
    static classType = "request";

    call!: TypeInputGroupCall;
    encryptedMessage!: Buffer;

    constructor(args: { call?: TypeInputGroupCall, encryptedMessage?: Buffer } = {}) {
        super();
        this.call = args.call!;
        this.encryptedMessage = args.encryptedMessage!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3853493613, false);
        writer.write(this.call.getBytes());
        writer.tgWriteBytes(this.encryptedMessage);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendGroupCallEncryptedMessage {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _encryptedMessage = reader.tgReadBytes();
        args.encryptedMessage = _encryptedMessage;
        return new SendGroupCallEncryptedMessage(args);
    }
}