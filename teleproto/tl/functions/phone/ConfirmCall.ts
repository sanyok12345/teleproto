import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPhoneCall } from "../../types/TypeInputPhoneCall";
import { TypePhoneCallProtocol } from "../../types/TypePhoneCallProtocol";
import { TypePhoneCall } from "../../types/phone/TypePhoneCall";

export class ConfirmCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 788404002;
    static SUBCLASS_OF_ID = 3565878863;
    static className = "phone.ConfirmCall";
    static classType = "request";

    peer?: TypeInputPhoneCall;
    gA!: Buffer;
    keyFingerprint!: bigint;
    protocol!: TypePhoneCallProtocol;

    constructor(args: { peer?: TypeInputPhoneCall, gA?: Buffer, keyFingerprint?: bigint, protocol?: TypePhoneCallProtocol } = {}) {
        super();
        this.peer = args.peer;
        this.gA = args.gA!;
        this.keyFingerprint = args.keyFingerprint!;
        this.protocol = args.protocol!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(788404002, false);
        writer.write(this.peer!.getBytes());
        writer.tgWriteBytes(this.gA);
        writer.writeLargeInt(this.keyFingerprint, 64);
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

    static fromReader(reader: BinaryReader): ConfirmCall {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _gA = reader.tgReadBytes();
        args.gA = _gA;
        const _keyFingerprint = reader.readLargeInt(64);
        args.keyFingerprint = _keyFingerprint;
        const _protocol = reader.tgReadObject();
        args.protocol = _protocol;
        return new ConfirmCall(args);
    }
}