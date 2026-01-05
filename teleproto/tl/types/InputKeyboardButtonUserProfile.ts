import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputUser } from "./TypeInputUser";

export class InputKeyboardButtonUserProfile extends TLObject {
    static CONSTRUCTOR_ID = 3918005115;
    static SUBCLASS_OF_ID = 195916963;
    static className = "InputKeyboardButtonUserProfile";
    static classType = "constructor";

    text!: string;
    userId!: TypeInputUser;

    constructor(args: { text?: string, userId?: TypeInputUser } = {}) {
        super();
        this.text = args.text!;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3918005115, false);
        writer.tgWriteString(this.text);
        writer.write(this.userId.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputKeyboardButtonUserProfile {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new InputKeyboardButtonUserProfile(args);
    }
}