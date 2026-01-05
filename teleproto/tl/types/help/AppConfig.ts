import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeJSONValue } from "../TypeJSONValue";

export class AppConfig extends TLObject {
    static CONSTRUCTOR_ID = 3709368366;
    static SUBCLASS_OF_ID = 339221658;
    static className = "help.AppConfig";
    static classType = "constructor";

    hash!: number;
    config!: TypeJSONValue;

    constructor(args: { hash?: number, config?: TypeJSONValue } = {}) {
        super();
        this.hash = args.hash!;
        this.config = args.config!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3709368366, false);
        writer.writeInt(this.hash);
        writer.write(this.config.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AppConfig {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        const _config = reader.tgReadObject();
        args.config = _config;
        return new AppConfig(args);
    }
}