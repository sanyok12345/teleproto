import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePaymentRequestedInfo } from "../TypePaymentRequestedInfo";

export class SavedInfo extends TLObject {
    static CONSTRUCTOR_ID = 4220511292;
    static SUBCLASS_OF_ID = 2906452294;
    static className = "payments.SavedInfo";
    static classType = "constructor";

    flags!: number;
    hasSavedCredentials?: boolean;
    savedInfo?: TypePaymentRequestedInfo;

    constructor(args: { flags?: number, hasSavedCredentials?: boolean, savedInfo?: TypePaymentRequestedInfo } = {}) {
        super();
        this.flags = args.flags!;
        this.hasSavedCredentials = args.hasSavedCredentials;
        this.savedInfo = args.savedInfo;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4220511292, false);
        let flags = 0;
        if (this.hasSavedCredentials) { flags |= 1 << 1; }
        if (this.savedInfo !== undefined && this.savedInfo !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.hasSavedCredentials !== undefined && this.hasSavedCredentials !== null) {
        }
        if (this.savedInfo !== undefined && this.savedInfo !== null) {
            writer.write(this.savedInfo.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedInfo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _hasSavedCredentials = true;
            args.hasSavedCredentials = _hasSavedCredentials;
        } else {
            args.hasSavedCredentials = false;
        }
        if (args.flags & (1 << 0)) {
            const _savedInfo = reader.tgReadObject();
            args.savedInfo = _savedInfo;
        } else {
            args.savedInfo = undefined;
        }
        return new SavedInfo(args);
    }
}