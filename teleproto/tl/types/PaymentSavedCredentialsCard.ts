import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PaymentSavedCredentialsCard extends TLObject {
    static CONSTRUCTOR_ID = 3452074527;
    static SUBCLASS_OF_ID = 3009576675;
    static className = "PaymentSavedCredentialsCard";
    static classType = "constructor";

    id!: string;
    title!: string;

    constructor(args: { id?: string, title?: string } = {}) {
        super();
        this.id = args.id!;
        this.title = args.title!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3452074527, false);
        writer.tgWriteString(this.id);
        writer.tgWriteString(this.title);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaymentSavedCredentialsCard {
        const args: any = {};
        const _id = reader.tgReadString();
        args.id = _id;
        const _title = reader.tgReadString();
        args.title = _title;
        return new PaymentSavedCredentialsCard(args);
    }
}