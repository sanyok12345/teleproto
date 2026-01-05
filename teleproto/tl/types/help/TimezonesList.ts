import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeTimezone } from "../TypeTimezone";

export class TimezonesList extends TLObject {
    static CONSTRUCTOR_ID = 2071260529;
    static SUBCLASS_OF_ID = 3396789365;
    static className = "help.TimezonesList";
    static classType = "constructor";

    timezones!: TypeTimezone[];
    hash!: number;

    constructor(args: { timezones?: TypeTimezone[], hash?: number } = {}) {
        super();
        this.timezones = args.timezones!;
        this.hash = args.hash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2071260529, false);
        writer.writeVector(this.timezones, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.hash);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TimezonesList {
        const args: any = {};
        const _timezones = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.timezones = _timezones;
        const _hash = reader.readInt();
        args.hash = _hash;
        return new TimezonesList(args);
    }
}