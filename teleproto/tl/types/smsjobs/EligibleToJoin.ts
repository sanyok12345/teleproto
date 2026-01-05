import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class EligibleToJoin extends TLObject {
    static CONSTRUCTOR_ID = 3700114639;
    static SUBCLASS_OF_ID = 1589076134;
    static className = "smsjobs.EligibleToJoin";
    static classType = "constructor";

    termsUrl!: string;
    monthlySentSms!: number;

    constructor(args: { termsUrl?: string, monthlySentSms?: number } = {}) {
        super();
        this.termsUrl = args.termsUrl!;
        this.monthlySentSms = args.monthlySentSms!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3700114639, false);
        writer.tgWriteString(this.termsUrl);
        writer.writeInt(this.monthlySentSms);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EligibleToJoin {
        const args: any = {};
        const _termsUrl = reader.tgReadString();
        args.termsUrl = _termsUrl;
        const _monthlySentSms = reader.readInt();
        args.monthlySentSms = _monthlySentSms;
        return new EligibleToJoin(args);
    }
}