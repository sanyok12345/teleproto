import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGroupCall } from "./TypeInputGroupCall";
import { TypePeer } from "./TypePeer";

export class UpdateGroupCallEncryptedMessage extends TLObject {
    static CONSTRUCTOR_ID = 3377964902;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateGroupCallEncryptedMessage";
    static classType = "constructor";

    call!: TypeInputGroupCall;
    fromId!: TypePeer;
    encryptedMessage!: Buffer;

    constructor(args: { call?: TypeInputGroupCall, fromId?: TypePeer, encryptedMessage?: Buffer } = {}) {
        super();
        this.call = args.call!;
        this.fromId = args.fromId!;
        this.encryptedMessage = args.encryptedMessage!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3377964902, false);
        writer.write(this.call.getBytes());
        writer.write(this.fromId.getBytes());
        writer.tgWriteBytes(this.encryptedMessage);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateGroupCallEncryptedMessage {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _fromId = reader.tgReadObject();
        args.fromId = _fromId;
        const _encryptedMessage = reader.tgReadBytes();
        args.encryptedMessage = _encryptedMessage;
        return new UpdateGroupCallEncryptedMessage(args);
    }
}