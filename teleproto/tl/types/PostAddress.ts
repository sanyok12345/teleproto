import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PostAddress extends TLObject {
    static CONSTRUCTOR_ID = 512535275;
    static SUBCLASS_OF_ID = 2373900844;
    static className = "PostAddress";
    static classType = "constructor";

    streetLine1!: string;
    streetLine2!: string;
    city!: string;
    state!: string;
    countryIso2!: string;
    postCode!: string;

    constructor(args: { streetLine1?: string, streetLine2?: string, city?: string, state?: string, countryIso2?: string, postCode?: string } = {}) {
        super();
        this.streetLine1 = args.streetLine1!;
        this.streetLine2 = args.streetLine2!;
        this.city = args.city!;
        this.state = args.state!;
        this.countryIso2 = args.countryIso2!;
        this.postCode = args.postCode!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(512535275, false);
        writer.tgWriteString(this.streetLine1);
        writer.tgWriteString(this.streetLine2);
        writer.tgWriteString(this.city);
        writer.tgWriteString(this.state);
        writer.tgWriteString(this.countryIso2);
        writer.tgWriteString(this.postCode);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PostAddress {
        const args: any = {};
        const _streetLine1 = reader.tgReadString();
        args.streetLine1 = _streetLine1;
        const _streetLine2 = reader.tgReadString();
        args.streetLine2 = _streetLine2;
        const _city = reader.tgReadString();
        args.city = _city;
        const _state = reader.tgReadString();
        args.state = _state;
        const _countryIso2 = reader.tgReadString();
        args.countryIso2 = _countryIso2;
        const _postCode = reader.tgReadString();
        args.postCode = _postCode;
        return new PostAddress(args);
    }
}