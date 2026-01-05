import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class GeoPointAddress extends TLObject {
    static CONSTRUCTOR_ID = 3729546643;
    static SUBCLASS_OF_ID = 2522202840;
    static className = "GeoPointAddress";
    static classType = "constructor";

    flags!: number;
    countryIso2!: string;
    state?: string;
    city?: string;
    street?: string;

    constructor(args: { flags?: number, countryIso2?: string, state?: string, city?: string, street?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.countryIso2 = args.countryIso2!;
        this.state = args.state;
        this.city = args.city;
        this.street = args.street;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3729546643, false);
        let flags = 0;
        if (this.state !== undefined && this.state !== null) { flags |= 1 << 0; }
        if (this.city !== undefined && this.city !== null) { flags |= 1 << 1; }
        if (this.street !== undefined && this.street !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.countryIso2);
        if (this.state !== undefined && this.state !== null) {
            writer.tgWriteString(this.state);
        }
        if (this.city !== undefined && this.city !== null) {
            writer.tgWriteString(this.city);
        }
        if (this.street !== undefined && this.street !== null) {
            writer.tgWriteString(this.street);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GeoPointAddress {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _countryIso2 = reader.tgReadString();
        args.countryIso2 = _countryIso2;
        if (args.flags & (1 << 0)) {
            const _state = reader.tgReadString();
            args.state = _state;
        } else {
            args.state = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _city = reader.tgReadString();
            args.city = _city;
        } else {
            args.city = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _street = reader.tgReadString();
            args.street = _street;
        } else {
            args.street = undefined;
        }
        return new GeoPointAddress(args);
    }
}