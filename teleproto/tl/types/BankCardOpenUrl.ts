import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BankCardOpenUrl extends TLObject {
    static CONSTRUCTOR_ID = 4117234314;
    static SUBCLASS_OF_ID = 4074915342;
    static className = "BankCardOpenUrl";
    static classType = "constructor";

    url!: string;
    name!: string;

    constructor(args: { url?: string, name?: string } = {}) {
        super();
        this.url = args.url!;
        this.name = args.name!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4117234314, false);
        writer.tgWriteString(this.url);
        writer.tgWriteString(this.name);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BankCardOpenUrl {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _name = reader.tgReadString();
        args.name = _name;
        return new BankCardOpenUrl(args);
    }
}