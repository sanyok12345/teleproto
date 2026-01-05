import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class PromoDataEmpty extends TLObject {
    static CONSTRUCTOR_ID = 2566302837;
    static SUBCLASS_OF_ID = 2639877442;
    static className = "help.PromoDataEmpty";
    static classType = "constructor";

    expires!: number;

    constructor(args: { expires?: number } = {}) {
        super();
        this.expires = args.expires!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2566302837, false);
        writer.writeInt(this.expires);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PromoDataEmpty {
        const args: any = {};
        const _expires = reader.readInt();
        args.expires = _expires;
        return new PromoDataEmpty(args);
    }
}