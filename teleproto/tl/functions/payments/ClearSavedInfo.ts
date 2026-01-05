import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ClearSavedInfo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3627905217;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "payments.ClearSavedInfo";
    static classType = "request";

    flags?: number;
    credentials?: boolean;
    info?: boolean;

    constructor(args: { flags?: number, credentials?: boolean, info?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.credentials = args.credentials;
        this.info = args.info;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3627905217, false);
        let flags = 0;
        if (this.credentials) { flags |= 1 << 0; }
        if (this.info) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.credentials !== undefined && this.credentials !== null) {
        }
        if (this.info !== undefined && this.info !== null) {
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

    static fromReader(reader: BinaryReader): ClearSavedInfo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _credentials = true;
            args.credentials = _credentials;
        } else {
            args.credentials = false;
        }
        if (args.flags & (1 << 1)) {
            const _info = true;
            args.info = _info;
        } else {
            args.info = false;
        }
        return new ClearSavedInfo(args);
    }
}