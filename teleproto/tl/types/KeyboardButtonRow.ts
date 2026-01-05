import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeKeyboardButton } from "./TypeKeyboardButton";

export class KeyboardButtonRow extends TLObject {
    static CONSTRUCTOR_ID = 2002815875;
    static SUBCLASS_OF_ID = 2222403758;
    static className = "KeyboardButtonRow";
    static classType = "constructor";

    buttons!: TypeKeyboardButton[];

    constructor(args: { buttons?: TypeKeyboardButton[] } = {}) {
        super();
        this.buttons = args.buttons!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2002815875, false);
        writer.writeVector(this.buttons, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButtonRow {
        const args: any = {};
        const _buttons = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.buttons = _buttons;
        return new KeyboardButtonRow(args);
    }
}