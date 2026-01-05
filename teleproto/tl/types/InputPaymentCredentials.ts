import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDataJSON } from "./TypeDataJSON";

export class InputPaymentCredentials extends TLObject {
    static CONSTRUCTOR_ID = 873977640;
    static SUBCLASS_OF_ID = 681157949;
    static className = "InputPaymentCredentials";
    static classType = "constructor";

    flags!: number;
    save?: boolean;
    data!: TypeDataJSON;

    constructor(args: { flags?: number, save?: boolean, data?: TypeDataJSON } = {}) {
        super();
        this.flags = args.flags!;
        this.save = args.save;
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(873977640, false);
        let flags = 0;
        if (this.save) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.save !== undefined && this.save !== null) {
        }
        writer.write(this.data.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPaymentCredentials {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _save = true;
            args.save = _save;
        } else {
            args.save = false;
        }
        const _data = reader.tgReadObject();
        args.data = _data;
        return new InputPaymentCredentials(args);
    }
}