import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPasskeyCredentialFirebasePNV extends TLObject {
    static CONSTRUCTOR_ID = 1528613672;
    static SUBCLASS_OF_ID = 514925102;
    static className = "InputPasskeyCredentialFirebasePNV";
    static classType = "constructor";

    pnvToken!: string;

    constructor(args: { pnvToken?: string } = {}) {
        super();
        this.pnvToken = args.pnvToken!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1528613672, false);
        writer.tgWriteString(this.pnvToken);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPasskeyCredentialFirebasePNV {
        const args: any = {};
        const _pnvToken = reader.tgReadString();
        args.pnvToken = _pnvToken;
        return new InputPasskeyCredentialFirebasePNV(args);
    }
}