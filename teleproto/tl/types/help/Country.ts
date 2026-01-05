import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeCountryCode } from "../help/TypeCountryCode";

export class Country extends TLObject {
    static CONSTRUCTOR_ID = 3280440867;
    static SUBCLASS_OF_ID = 2720964136;
    static className = "help.Country";
    static classType = "constructor";

    flags!: number;
    hidden?: boolean;
    iso2!: string;
    defaultName!: string;
    name?: string;
    countryCodes!: TypeCountryCode[];

    constructor(args: { flags?: number, hidden?: boolean, iso2?: string, defaultName?: string, name?: string, countryCodes?: TypeCountryCode[] } = {}) {
        super();
        this.flags = args.flags!;
        this.hidden = args.hidden;
        this.iso2 = args.iso2!;
        this.defaultName = args.defaultName!;
        this.name = args.name;
        this.countryCodes = args.countryCodes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3280440867, false);
        let flags = 0;
        if (this.hidden) { flags |= 1 << 0; }
        if (this.name !== undefined && this.name !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.hidden !== undefined && this.hidden !== null) {
        }
        writer.tgWriteString(this.iso2);
        writer.tgWriteString(this.defaultName);
        if (this.name !== undefined && this.name !== null) {
            writer.tgWriteString(this.name);
        }
        writer.writeVector(this.countryCodes, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Country {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _hidden = true;
            args.hidden = _hidden;
        } else {
            args.hidden = false;
        }
        const _iso2 = reader.tgReadString();
        args.iso2 = _iso2;
        const _defaultName = reader.tgReadString();
        args.defaultName = _defaultName;
        if (args.flags & (1 << 1)) {
            const _name = reader.tgReadString();
            args.name = _name;
        } else {
            args.name = undefined;
        }
        const _countryCodes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.countryCodes = _countryCodes;
        return new Country(args);
    }
}