import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarsGiveawayWinnersOption extends TLObject {
    static CONSTRUCTOR_ID = 1411605001;
    static SUBCLASS_OF_ID = 4227506916;
    static className = "StarsGiveawayWinnersOption";
    static classType = "constructor";

    flags!: number;
    default?: boolean;
    users!: number;
    perUserStars!: bigint;

    constructor(args: { flags?: number, default?: boolean, users?: number, perUserStars?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.default = args.default;
        this.users = args.users!;
        this.perUserStars = args.perUserStars!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1411605001, false);
        let flags = 0;
        if (this.default) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.default !== undefined && this.default !== null) {
        }
        writer.writeInt(this.users);
        writer.writeLargeInt(this.perUserStars, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsGiveawayWinnersOption {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _default = true;
            args.default = _default;
        } else {
            args.default = false;
        }
        const _users = reader.readInt();
        args.users = _users;
        const _perUserStars = reader.readLargeInt(64);
        args.perUserStars = _perUserStars;
        return new StarsGiveawayWinnersOption(args);
    }
}