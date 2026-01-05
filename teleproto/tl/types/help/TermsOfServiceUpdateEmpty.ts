import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class TermsOfServiceUpdateEmpty extends TLObject {
    static CONSTRUCTOR_ID = 3811614591;
    static SUBCLASS_OF_ID = 691808631;
    static className = "help.TermsOfServiceUpdateEmpty";
    static classType = "constructor";

    expires!: number;

    constructor(args: { expires?: number } = {}) {
        super();
        this.expires = args.expires!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3811614591, false);
        writer.writeInt(this.expires);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TermsOfServiceUpdateEmpty {
        const args: any = {};
        const _expires = reader.readInt();
        args.expires = _expires;
        return new TermsOfServiceUpdateEmpty(args);
    }
}