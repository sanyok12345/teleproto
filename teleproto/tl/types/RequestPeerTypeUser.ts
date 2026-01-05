import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class RequestPeerTypeUser extends TLObject {
    static CONSTRUCTOR_ID = 1597737472;
    static SUBCLASS_OF_ID = 3919636500;
    static className = "RequestPeerTypeUser";
    static classType = "constructor";

    flags!: number;
    bot?: boolean;
    premium?: boolean;

    constructor(args: { flags?: number, bot?: boolean, premium?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.bot = args.bot;
        this.premium = args.premium;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1597737472, false);
        let flags = 0;
        if (this.bot !== undefined && this.bot !== null) { flags |= 1 << 0; }
        if (this.premium !== undefined && this.premium !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.bot !== undefined && this.bot !== null) {
            writer.tgWriteBool(this.bot);
        }
        if (this.premium !== undefined && this.premium !== null) {
            writer.tgWriteBool(this.premium);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RequestPeerTypeUser {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _bot = reader.tgReadBool();
            args.bot = _bot;
        } else {
            args.bot = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _premium = reader.tgReadBool();
            args.premium = _premium;
        } else {
            args.premium = undefined;
        }
        return new RequestPeerTypeUser(args);
    }
}