import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDataJSON } from "./TypeDataJSON";

export class InputPasskeyResponseLogin extends TLObject {
    static CONSTRUCTOR_ID = 3273638218;
    static SUBCLASS_OF_ID = 519096269;
    static className = "InputPasskeyResponseLogin";
    static classType = "constructor";

    clientData!: TypeDataJSON;
    authenticatorData!: Buffer;
    signature!: Buffer;
    userHandle!: string;

    constructor(args: { clientData?: TypeDataJSON, authenticatorData?: Buffer, signature?: Buffer, userHandle?: string } = {}) {
        super();
        this.clientData = args.clientData!;
        this.authenticatorData = args.authenticatorData!;
        this.signature = args.signature!;
        this.userHandle = args.userHandle!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3273638218, false);
        writer.write(this.clientData.getBytes());
        writer.tgWriteBytes(this.authenticatorData);
        writer.tgWriteBytes(this.signature);
        writer.tgWriteString(this.userHandle);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPasskeyResponseLogin {
        const args: any = {};
        const _clientData = reader.tgReadObject();
        args.clientData = _clientData;
        const _authenticatorData = reader.tgReadBytes();
        args.authenticatorData = _authenticatorData;
        const _signature = reader.tgReadBytes();
        args.signature = _signature;
        const _userHandle = reader.tgReadString();
        args.userHandle = _userHandle;
        return new InputPasskeyResponseLogin(args);
    }
}