import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDataJSON } from "../TypeDataJSON";

export class PasskeyLoginOptions extends TLObject {
    static CONSTRUCTOR_ID = 3791878025;
    static SUBCLASS_OF_ID = 3648598066;
    static className = "auth.PasskeyLoginOptions";
    static classType = "constructor";

    options!: TypeDataJSON;

    constructor(args: { options?: TypeDataJSON } = {}) {
        super();
        this.options = args.options!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3791878025, false);
        writer.write(this.options.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PasskeyLoginOptions {
        const args: any = {};
        const _options = reader.tgReadObject();
        args.options = _options;
        return new PasskeyLoginOptions(args);
    }
}