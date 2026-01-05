import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeBankCardOpenUrl } from "../TypeBankCardOpenUrl";

export class BankCardData extends TLObject {
    static CONSTRUCTOR_ID = 1042605427;
    static SUBCLASS_OF_ID = 2356008587;
    static className = "payments.BankCardData";
    static classType = "constructor";

    title!: string;
    openUrls!: TypeBankCardOpenUrl[];

    constructor(args: { title?: string, openUrls?: TypeBankCardOpenUrl[] } = {}) {
        super();
        this.title = args.title!;
        this.openUrls = args.openUrls!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1042605427, false);
        writer.tgWriteString(this.title);
        writer.writeVector(this.openUrls, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BankCardData {
        const args: any = {};
        const _title = reader.tgReadString();
        args.title = _title;
        const _openUrls = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.openUrls = _openUrls;
        return new BankCardData(args);
    }
}