import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ReportMissingCode extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3416125430;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "auth.ReportMissingCode";
    static classType = "request";

    phoneNumber?: string;
    phoneCodeHash?: string;
    mnc!: string;

    constructor(args: { phoneNumber?: string, phoneCodeHash?: string, mnc?: string } = {}) {
        super();
        this.phoneNumber = args.phoneNumber;
        this.phoneCodeHash = args.phoneCodeHash;
        this.mnc = args.mnc!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3416125430, false);
        writer.tgWriteString(this.phoneNumber!);
        writer.tgWriteString(this.phoneCodeHash!);
        writer.tgWriteString(this.mnc);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReportMissingCode {
        const args: any = {};
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        const _mnc = reader.tgReadString();
        args.mnc = _mnc;
        return new ReportMissingCode(args);
    }
}