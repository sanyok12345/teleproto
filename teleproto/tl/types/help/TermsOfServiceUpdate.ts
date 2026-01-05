import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeTermsOfService } from "../help/TypeTermsOfService";

export class TermsOfServiceUpdate extends TLObject {
    static CONSTRUCTOR_ID = 686618977;
    static SUBCLASS_OF_ID = 691808631;
    static className = "help.TermsOfServiceUpdate";
    static classType = "constructor";

    expires!: number;
    termsOfService!: TypeTermsOfService;

    constructor(args: { expires?: number, termsOfService?: TypeTermsOfService } = {}) {
        super();
        this.expires = args.expires!;
        this.termsOfService = args.termsOfService!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(686618977, false);
        writer.writeInt(this.expires);
        writer.write(this.termsOfService.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TermsOfServiceUpdate {
        const args: any = {};
        const _expires = reader.readInt();
        args.expires = _expires;
        const _termsOfService = reader.tgReadObject();
        args.termsOfService = _termsOfService;
        return new TermsOfServiceUpdate(args);
    }
}