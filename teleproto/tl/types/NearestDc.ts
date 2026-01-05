import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class NearestDc extends TLObject {
    static CONSTRUCTOR_ID = 2384074613;
    static SUBCLASS_OF_ID = 947323999;
    static className = "NearestDc";
    static classType = "constructor";

    country!: string;
    thisDc!: number;
    nearestDc!: number;

    constructor(args: { country?: string, thisDc?: number, nearestDc?: number } = {}) {
        super();
        this.country = args.country!;
        this.thisDc = args.thisDc!;
        this.nearestDc = args.nearestDc!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2384074613, false);
        writer.tgWriteString(this.country);
        writer.writeInt(this.thisDc);
        writer.writeInt(this.nearestDc);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): NearestDc {
        const args: any = {};
        const _country = reader.tgReadString();
        args.country = _country;
        const _thisDc = reader.readInt();
        args.thisDc = _thisDc;
        const _nearestDc = reader.readInt();
        args.nearestDc = _nearestDc;
        return new NearestDc(args);
    }
}