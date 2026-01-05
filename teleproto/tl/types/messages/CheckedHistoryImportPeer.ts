import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CheckedHistoryImportPeer extends TLObject {
    static CONSTRUCTOR_ID = 2723014423;
    static SUBCLASS_OF_ID = 3091968823;
    static className = "messages.CheckedHistoryImportPeer";
    static classType = "constructor";

    confirmText!: string;

    constructor(args: { confirmText?: string } = {}) {
        super();
        this.confirmText = args.confirmText!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2723014423, false);
        writer.tgWriteString(this.confirmText);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CheckedHistoryImportPeer {
        const args: any = {};
        const _confirmText = reader.tgReadString();
        args.confirmText = _confirmText;
        return new CheckedHistoryImportPeer(args);
    }
}