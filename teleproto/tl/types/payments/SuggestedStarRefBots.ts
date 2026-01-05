import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStarRefProgram } from "../TypeStarRefProgram";
import { TypeUser } from "../TypeUser";

export class SuggestedStarRefBots extends TLObject {
    static CONSTRUCTOR_ID = 3033913433;
    static SUBCLASS_OF_ID = 1880658499;
    static className = "payments.SuggestedStarRefBots";
    static classType = "constructor";

    flags!: number;
    count!: number;
    suggestedBots!: TypeStarRefProgram[];
    users!: TypeUser[];
    nextOffset?: string;

    constructor(args: { flags?: number, count?: number, suggestedBots?: TypeStarRefProgram[], users?: TypeUser[], nextOffset?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.count = args.count!;
        this.suggestedBots = args.suggestedBots!;
        this.users = args.users!;
        this.nextOffset = args.nextOffset;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3033913433, false);
        let flags = 0;
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.count);
        writer.writeVector(this.suggestedBots, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        if (this.nextOffset !== undefined && this.nextOffset !== null) {
            writer.tgWriteString(this.nextOffset);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SuggestedStarRefBots {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _count = reader.readInt();
        args.count = _count;
        const _suggestedBots = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.suggestedBots = _suggestedBots;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        if (args.flags & (1 << 0)) {
            const _nextOffset = reader.tgReadString();
            args.nextOffset = _nextOffset;
        } else {
            args.nextOffset = undefined;
        }
        return new SuggestedStarRefBots(args);
    }
}