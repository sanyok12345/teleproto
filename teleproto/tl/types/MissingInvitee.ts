import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MissingInvitee extends TLObject {
    static CONSTRUCTOR_ID = 1653379620;
    static SUBCLASS_OF_ID = 1552723164;
    static className = "MissingInvitee";
    static classType = "constructor";

    flags!: number;
    premiumWouldAllowInvite?: boolean;
    premiumRequiredForPm?: boolean;
    userId!: bigint;

    constructor(args: { flags?: number, premiumWouldAllowInvite?: boolean, premiumRequiredForPm?: boolean, userId?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.premiumWouldAllowInvite = args.premiumWouldAllowInvite;
        this.premiumRequiredForPm = args.premiumRequiredForPm;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1653379620, false);
        let flags = 0;
        if (this.premiumWouldAllowInvite) { flags |= 1 << 0; }
        if (this.premiumRequiredForPm) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.premiumWouldAllowInvite !== undefined && this.premiumWouldAllowInvite !== null) {
        }
        if (this.premiumRequiredForPm !== undefined && this.premiumRequiredForPm !== null) {
        }
        writer.writeLargeInt(this.userId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MissingInvitee {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _premiumWouldAllowInvite = true;
            args.premiumWouldAllowInvite = _premiumWouldAllowInvite;
        } else {
            args.premiumWouldAllowInvite = false;
        }
        if (args.flags & (1 << 1)) {
            const _premiumRequiredForPm = true;
            args.premiumRequiredForPm = _premiumRequiredForPm;
        } else {
            args.premiumRequiredForPm = false;
        }
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        return new MissingInvitee(args);
    }
}