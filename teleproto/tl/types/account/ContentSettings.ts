import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ContentSettings extends TLObject {
    static CONSTRUCTOR_ID = 1474462241;
    static SUBCLASS_OF_ID = 2923427985;
    static className = "account.ContentSettings";
    static classType = "constructor";

    flags!: number;
    sensitiveEnabled?: boolean;
    sensitiveCanChange?: boolean;

    constructor(args: { flags?: number, sensitiveEnabled?: boolean, sensitiveCanChange?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.sensitiveEnabled = args.sensitiveEnabled;
        this.sensitiveCanChange = args.sensitiveCanChange;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1474462241, false);
        let flags = 0;
        if (this.sensitiveEnabled) { flags |= 1 << 0; }
        if (this.sensitiveCanChange) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.sensitiveEnabled !== undefined && this.sensitiveEnabled !== null) {
        }
        if (this.sensitiveCanChange !== undefined && this.sensitiveCanChange !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ContentSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _sensitiveEnabled = true;
            args.sensitiveEnabled = _sensitiveEnabled;
        } else {
            args.sensitiveEnabled = false;
        }
        if (args.flags & (1 << 1)) {
            const _sensitiveCanChange = true;
            args.sensitiveCanChange = _sensitiveCanChange;
        } else {
            args.sensitiveCanChange = false;
        }
        return new ContentSettings(args);
    }
}