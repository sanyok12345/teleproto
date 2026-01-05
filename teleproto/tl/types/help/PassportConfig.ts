import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDataJSON } from "../TypeDataJSON";

export class PassportConfig extends TLObject {
    static CONSTRUCTOR_ID = 2694370991;
    static SUBCLASS_OF_ID = 3328622765;
    static className = "help.PassportConfig";
    static classType = "constructor";

    hash!: number;
    countriesLangs!: TypeDataJSON;

    constructor(args: { hash?: number, countriesLangs?: TypeDataJSON } = {}) {
        super();
        this.hash = args.hash!;
        this.countriesLangs = args.countriesLangs!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2694370991, false);
        writer.writeInt(this.hash);
        writer.write(this.countriesLangs.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PassportConfig {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        const _countriesLangs = reader.tgReadObject();
        args.countriesLangs = _countriesLangs;
        return new PassportConfig(args);
    }
}