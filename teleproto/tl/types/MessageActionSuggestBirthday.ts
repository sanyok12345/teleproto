import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeBirthday } from "./TypeBirthday";

export class MessageActionSuggestBirthday extends TLObject {
    static CONSTRUCTOR_ID = 747579941;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionSuggestBirthday";
    static classType = "constructor";

    birthday!: TypeBirthday;

    constructor(args: { birthday?: TypeBirthday } = {}) {
        super();
        this.birthday = args.birthday!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(747579941, false);
        writer.write(this.birthday.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionSuggestBirthday {
        const args: any = {};
        const _birthday = reader.tgReadObject();
        args.birthday = _birthday;
        return new MessageActionSuggestBirthday(args);
    }
}