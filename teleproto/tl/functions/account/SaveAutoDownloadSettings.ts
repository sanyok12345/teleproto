import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAutoDownloadSettings } from "../../types/TypeAutoDownloadSettings";

export class SaveAutoDownloadSettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1995661875;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.SaveAutoDownloadSettings";
    static classType = "request";

    flags?: number;
    low?: boolean;
    high?: boolean;
    settings!: TypeAutoDownloadSettings;

    constructor(args: { flags?: number, low?: boolean, high?: boolean, settings?: TypeAutoDownloadSettings } = {}) {
        super();
        this.flags = args.flags;
        this.low = args.low;
        this.high = args.high;
        this.settings = args.settings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1995661875, false);
        let flags = 0;
        if (this.low) { flags |= 1 << 0; }
        if (this.high) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.low !== undefined && this.low !== null) {
        }
        if (this.high !== undefined && this.high !== null) {
        }
        writer.write(this.settings.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveAutoDownloadSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _low = true;
            args.low = _low;
        } else {
            args.low = false;
        }
        if (args.flags & (1 << 1)) {
            const _high = true;
            args.high = _high;
        } else {
            args.high = false;
        }
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        return new SaveAutoDownloadSettings(args);
    }
}