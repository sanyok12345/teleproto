import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterPhoneCalls extends TLObject {
    static CONSTRUCTOR_ID = 2160695144;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterPhoneCalls";
    static classType = "constructor";

    flags!: number;
    missed?: boolean;

    constructor(args: { flags?: number, missed?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.missed = args.missed;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2160695144, false);
        let flags = 0;
        if (this.missed) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.missed !== undefined && this.missed !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterPhoneCalls {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _missed = true;
            args.missed = _missed;
        } else {
            args.missed = false;
        }
        return new InputMessagesFilterPhoneCalls(args);
    }
}