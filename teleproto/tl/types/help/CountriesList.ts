import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeCountry } from "../help/TypeCountry";

export class CountriesList extends TLObject {
    static CONSTRUCTOR_ID = 2278585758;
    static SUBCLASS_OF_ID = 3929144968;
    static className = "help.CountriesList";
    static classType = "constructor";

    countries!: TypeCountry[];
    hash!: number;

    constructor(args: { countries?: TypeCountry[], hash?: number } = {}) {
        super();
        this.countries = args.countries!;
        this.hash = args.hash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2278585758, false);
        writer.writeVector(this.countries, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.hash);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CountriesList {
        const args: any = {};
        const _countries = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.countries = _countries;
        const _hash = reader.readInt();
        args.hash = _hash;
        return new CountriesList(args);
    }
}