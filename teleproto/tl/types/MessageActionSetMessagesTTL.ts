import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionSetMessagesTTL extends TLObject {
    static CONSTRUCTOR_ID = 1007897979;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionSetMessagesTTL";
    static classType = "constructor";

    flags!: number;
    period!: number;
    autoSettingFrom?: bigint;

    constructor(args: { flags?: number, period?: number, autoSettingFrom?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.period = args.period!;
        this.autoSettingFrom = args.autoSettingFrom;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1007897979, false);
        let flags = 0;
        if (this.autoSettingFrom !== undefined && this.autoSettingFrom !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.period);
        if (this.autoSettingFrom !== undefined && this.autoSettingFrom !== null) {
            writer.writeLargeInt(this.autoSettingFrom, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionSetMessagesTTL {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _period = reader.readInt();
        args.period = _period;
        if (args.flags & (1 << 0)) {
            const _autoSettingFrom = reader.readLargeInt(64);
            args.autoSettingFrom = _autoSettingFrom;
        } else {
            args.autoSettingFrom = undefined;
        }
        return new MessageActionSetMessagesTTL(args);
    }
}