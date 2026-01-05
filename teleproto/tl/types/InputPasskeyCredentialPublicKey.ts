import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPasskeyResponse } from "./TypeInputPasskeyResponse";

export class InputPasskeyCredentialPublicKey extends TLObject {
    static CONSTRUCTOR_ID = 1009235855;
    static SUBCLASS_OF_ID = 514925102;
    static className = "InputPasskeyCredentialPublicKey";
    static classType = "constructor";

    id!: string;
    rawId!: string;
    response!: TypeInputPasskeyResponse;

    constructor(args: { id?: string, rawId?: string, response?: TypeInputPasskeyResponse } = {}) {
        super();
        this.id = args.id!;
        this.rawId = args.rawId!;
        this.response = args.response!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1009235855, false);
        writer.tgWriteString(this.id);
        writer.tgWriteString(this.rawId);
        writer.write(this.response.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPasskeyCredentialPublicKey {
        const args: any = {};
        const _id = reader.tgReadString();
        args.id = _id;
        const _rawId = reader.tgReadString();
        args.rawId = _rawId;
        const _response = reader.tgReadObject();
        args.response = _response;
        return new InputPasskeyCredentialPublicKey(args);
    }
}