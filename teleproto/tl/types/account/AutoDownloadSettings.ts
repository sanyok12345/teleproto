import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeAutoDownloadSettings } from "../TypeAutoDownloadSettings";

export class AutoDownloadSettings extends TLObject {
    static CONSTRUCTOR_ID = 1674235686;
    static SUBCLASS_OF_ID = 800610593;
    static className = "account.AutoDownloadSettings";
    static classType = "constructor";

    low!: TypeAutoDownloadSettings;
    medium!: TypeAutoDownloadSettings;
    high!: TypeAutoDownloadSettings;

    constructor(args: { low?: TypeAutoDownloadSettings, medium?: TypeAutoDownloadSettings, high?: TypeAutoDownloadSettings } = {}) {
        super();
        this.low = args.low!;
        this.medium = args.medium!;
        this.high = args.high!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1674235686, false);
        writer.write(this.low.getBytes());
        writer.write(this.medium.getBytes());
        writer.write(this.high.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AutoDownloadSettings {
        const args: any = {};
        const _low = reader.tgReadObject();
        args.low = _low;
        const _medium = reader.tgReadObject();
        args.medium = _medium;
        const _high = reader.tgReadObject();
        args.high = _high;
        return new AutoDownloadSettings(args);
    }
}