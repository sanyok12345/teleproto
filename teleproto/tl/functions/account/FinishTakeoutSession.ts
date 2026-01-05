import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class FinishTakeoutSession extends MTProtoRequest {
    static CONSTRUCTOR_ID = 489050862;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.FinishTakeoutSession";
    static classType = "request";

    flags?: number;
    success?: boolean;

    constructor(args: { flags?: number, success?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.success = args.success;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(489050862, false);
        let flags = 0;
        if (this.success) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.success !== undefined && this.success !== null) {
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

    static fromReader(reader: BinaryReader): FinishTakeoutSession {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _success = true;
            args.success = _success;
        } else {
            args.success = false;
        }
        return new FinishTakeoutSession(args);
    }
}