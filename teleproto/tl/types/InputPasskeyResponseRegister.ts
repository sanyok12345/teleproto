import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDataJSON } from "./TypeDataJSON";

export class InputPasskeyResponseRegister extends TLObject {
    static CONSTRUCTOR_ID = 1046713180;
    static SUBCLASS_OF_ID = 519096269;
    static className = "InputPasskeyResponseRegister";
    static classType = "constructor";

    clientData!: TypeDataJSON;
    attestationData!: Buffer;

    constructor(args: { clientData?: TypeDataJSON, attestationData?: Buffer } = {}) {
        super();
        this.clientData = args.clientData!;
        this.attestationData = args.attestationData!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1046713180, false);
        writer.write(this.clientData.getBytes());
        writer.tgWriteBytes(this.attestationData);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPasskeyResponseRegister {
        const args: any = {};
        const _clientData = reader.tgReadObject();
        args.clientData = _clientData;
        const _attestationData = reader.tgReadBytes();
        args.attestationData = _attestationData;
        return new InputPasskeyResponseRegister(args);
    }
}