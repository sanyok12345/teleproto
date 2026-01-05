import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ActivateStealthMode extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1471926630;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "stories.ActivateStealthMode";
    static classType = "request";

    flags?: number;
    past?: boolean;
    future?: boolean;

    constructor(args: { flags?: number, past?: boolean, future?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.past = args.past;
        this.future = args.future;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1471926630, false);
        let flags = 0;
        if (this.past) { flags |= 1 << 0; }
        if (this.future) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.past !== undefined && this.past !== null) {
        }
        if (this.future !== undefined && this.future !== null) {
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ActivateStealthMode {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _past = true;
            args.past = _past;
        } else {
            args.past = false;
        }
        if (args.flags & (1 << 1)) {
            const _future = true;
            args.future = _future;
        } else {
            args.future = false;
        }
        return new ActivateStealthMode(args);
    }
}