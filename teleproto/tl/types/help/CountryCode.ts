import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CountryCode extends TLObject {
    static CONSTRUCTOR_ID = 1107543535;
    static SUBCLASS_OF_ID = 1995654757;
    static className = "help.CountryCode";
    static classType = "constructor";

    flags!: number;
    countryCode!: string;
    prefixes?: string[];
    patterns?: string[];

    constructor(args: { flags?: number, countryCode?: string, prefixes?: string[], patterns?: string[] } = {}) {
        super();
        this.flags = args.flags!;
        this.countryCode = args.countryCode!;
        this.prefixes = args.prefixes;
        this.patterns = args.patterns;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1107543535, false);
        let flags = 0;
        if (this.prefixes !== undefined && this.prefixes !== null) { flags |= 1 << 0; }
        if (this.patterns !== undefined && this.patterns !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.countryCode);
        if (this.prefixes !== undefined && this.prefixes !== null) {
            writer.writeVector(this.prefixes, (item) => {
                writer.tgWriteString(item);
            });
        }
        if (this.patterns !== undefined && this.patterns !== null) {
            writer.writeVector(this.patterns, (item) => {
                writer.tgWriteString(item);
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CountryCode {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _countryCode = reader.tgReadString();
        args.countryCode = _countryCode;
        if (args.flags & (1 << 0)) {
            const _prefixes = reader.readVector((reader) => {
                const item = reader.tgReadString();
                return item;
            });
            args.prefixes = _prefixes;
        } else {
            args.prefixes = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _patterns = reader.readVector((reader) => {
                const item = reader.tgReadString();
                return item;
            });
            args.patterns = _patterns;
        } else {
            args.patterns = undefined;
        }
        return new CountryCode(args);
    }
}