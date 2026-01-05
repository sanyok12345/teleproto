import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageRange } from "./TypeMessageRange";

export class ChannelMessagesFilter extends TLObject {
    static CONSTRUCTOR_ID = 3447183703;
    static SUBCLASS_OF_ID = 322136662;
    static className = "ChannelMessagesFilter";
    static classType = "constructor";

    flags!: number;
    excludeNewMessages?: boolean;
    ranges!: TypeMessageRange[];

    constructor(args: { flags?: number, excludeNewMessages?: boolean, ranges?: TypeMessageRange[] } = {}) {
        super();
        this.flags = args.flags!;
        this.excludeNewMessages = args.excludeNewMessages;
        this.ranges = args.ranges!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3447183703, false);
        let flags = 0;
        if (this.excludeNewMessages) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.excludeNewMessages !== undefined && this.excludeNewMessages !== null) {
        }
        writer.writeVector(this.ranges, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelMessagesFilter {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _excludeNewMessages = true;
            args.excludeNewMessages = _excludeNewMessages;
        } else {
            args.excludeNewMessages = false;
        }
        const _ranges = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.ranges = _ranges;
        return new ChannelMessagesFilter(args);
    }
}