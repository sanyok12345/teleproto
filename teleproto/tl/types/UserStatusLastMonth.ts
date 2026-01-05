import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UserStatusLastMonth extends TLObject {
    static CONSTRUCTOR_ID = 1703516023;
    static SUBCLASS_OF_ID = 1527477310;
    static className = "UserStatusLastMonth";
    static classType = "constructor";

    flags!: number;
    byMe?: boolean;

    constructor(args: { flags?: number, byMe?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.byMe = args.byMe;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1703516023, false);
        let flags = 0;
        if (this.byMe) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.byMe !== undefined && this.byMe !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UserStatusLastMonth {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _byMe = true;
            args.byMe = _byMe;
        } else {
            args.byMe = false;
        }
        return new UserStatusLastMonth(args);
    }
}