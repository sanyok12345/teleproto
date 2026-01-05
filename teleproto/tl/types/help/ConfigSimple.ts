import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeAccessPointRule } from "../TypeAccessPointRule";

export class ConfigSimple extends TLObject {
    static CONSTRUCTOR_ID = 1515793004;
    static SUBCLASS_OF_ID = 689453764;
    static className = "help.ConfigSimple";
    static classType = "constructor";

    date!: number;
    expires!: number;
    rules!: TypeAccessPointRule[];

    constructor(args: { date?: number, expires?: number, rules?: TypeAccessPointRule[] } = {}) {
        super();
        this.date = args.date!;
        this.expires = args.expires!;
        this.rules = args.rules!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1515793004, false);
        writer.writeInt(this.date);
        writer.writeInt(this.expires);
        writer.writeVector(this.rules, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ConfigSimple {
        const args: any = {};
        const _date = reader.readInt();
        args.date = _date;
        const _expires = reader.readInt();
        args.expires = _expires;
        const _rules = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.rules = _rules;
        return new ConfigSimple(args);
    }
}