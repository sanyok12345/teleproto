import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class UpdateSettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 155164863;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "smsjobs.UpdateSettings";
    static classType = "request";

    flags?: number;
    allowInternational?: boolean;

    constructor(args: { flags?: number, allowInternational?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.allowInternational = args.allowInternational;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(155164863, false);
        let flags = 0;
        if (this.allowInternational) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.allowInternational !== undefined && this.allowInternational !== null) {
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _allowInternational = true;
            args.allowInternational = _allowInternational;
        } else {
            args.allowInternational = false;
        }
        return new UpdateSettings(args);
    }
}