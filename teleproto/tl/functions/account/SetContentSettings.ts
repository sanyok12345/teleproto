import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class SetContentSettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3044323691;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.SetContentSettings";
    static classType = "request";

    flags?: number;
    sensitiveEnabled?: boolean;

    constructor(args: { flags?: number, sensitiveEnabled?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.sensitiveEnabled = args.sensitiveEnabled;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3044323691, false);
        let flags = 0;
        if (this.sensitiveEnabled) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.sensitiveEnabled !== undefined && this.sensitiveEnabled !== null) {
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

    static fromReader(reader: BinaryReader): SetContentSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _sensitiveEnabled = true;
            args.sensitiveEnabled = _sensitiveEnabled;
        } else {
            args.sensitiveEnabled = false;
        }
        return new SetContentSettings(args);
    }
}