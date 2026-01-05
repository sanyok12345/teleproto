import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDataJSON } from "../TypeDataJSON";

export class PasskeyRegistrationOptions extends TLObject {
    static CONSTRUCTOR_ID = 3781909729;
    static SUBCLASS_OF_ID = 874349540;
    static className = "account.PasskeyRegistrationOptions";
    static classType = "constructor";

    options!: TypeDataJSON;

    constructor(args: { options?: TypeDataJSON } = {}) {
        super();
        this.options = args.options!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3781909729, false);
        writer.write(this.options.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PasskeyRegistrationOptions {
        const args: any = {};
        const _options = reader.tgReadObject();
        args.options = _options;
        return new PasskeyRegistrationOptions(args);
    }
}