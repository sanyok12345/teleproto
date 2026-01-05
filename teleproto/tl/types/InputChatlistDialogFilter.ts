import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputChatlistDialogFilter extends TLObject {
    static CONSTRUCTOR_ID = 4091599411;
    static SUBCLASS_OF_ID = 37721689;
    static className = "InputChatlistDialogFilter";
    static classType = "constructor";

    filterId!: number;

    constructor(args: { filterId?: number } = {}) {
        super();
        this.filterId = args.filterId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4091599411, false);
        writer.writeInt(this.filterId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputChatlistDialogFilter {
        const args: any = {};
        const _filterId = reader.readInt();
        args.filterId = _filterId;
        return new InputChatlistDialogFilter(args);
    }
}