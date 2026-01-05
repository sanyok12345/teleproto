import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputCollectiblePhone extends TLObject {
    static CONSTRUCTOR_ID = 2732725412;
    static SUBCLASS_OF_ID = 705659371;
    static className = "InputCollectiblePhone";
    static classType = "constructor";

    phone!: string;

    constructor(args: { phone?: string } = {}) {
        super();
        this.phone = args.phone!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2732725412, false);
        writer.tgWriteString(this.phone);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputCollectiblePhone {
        const args: any = {};
        const _phone = reader.tgReadString();
        args.phone = _phone;
        return new InputCollectiblePhone(args);
    }
}