import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class GiveawayInfo extends TLObject {
    static CONSTRUCTOR_ID = 1130879648;
    static SUBCLASS_OF_ID = 2527295421;
    static className = "payments.GiveawayInfo";
    static classType = "constructor";

    flags!: number;
    participating?: boolean;
    preparingResults?: boolean;
    startDate!: number;
    joinedTooEarlyDate?: number;
    adminDisallowedChatId?: bigint;
    disallowedCountry?: string;

    constructor(args: { flags?: number, participating?: boolean, preparingResults?: boolean, startDate?: number, joinedTooEarlyDate?: number, adminDisallowedChatId?: bigint, disallowedCountry?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.participating = args.participating;
        this.preparingResults = args.preparingResults;
        this.startDate = args.startDate!;
        this.joinedTooEarlyDate = args.joinedTooEarlyDate;
        this.adminDisallowedChatId = args.adminDisallowedChatId;
        this.disallowedCountry = args.disallowedCountry;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1130879648, false);
        let flags = 0;
        if (this.participating) { flags |= 1 << 0; }
        if (this.preparingResults) { flags |= 1 << 3; }
        if (this.joinedTooEarlyDate !== undefined && this.joinedTooEarlyDate !== null) { flags |= 1 << 1; }
        if (this.adminDisallowedChatId !== undefined && this.adminDisallowedChatId !== null) { flags |= 1 << 2; }
        if (this.disallowedCountry !== undefined && this.disallowedCountry !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.participating !== undefined && this.participating !== null) {
        }
        if (this.preparingResults !== undefined && this.preparingResults !== null) {
        }
        writer.writeInt(this.startDate);
        if (this.joinedTooEarlyDate !== undefined && this.joinedTooEarlyDate !== null) {
            writer.writeInt(this.joinedTooEarlyDate);
        }
        if (this.adminDisallowedChatId !== undefined && this.adminDisallowedChatId !== null) {
            writer.writeLargeInt(this.adminDisallowedChatId, 64);
        }
        if (this.disallowedCountry !== undefined && this.disallowedCountry !== null) {
            writer.tgWriteString(this.disallowedCountry);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GiveawayInfo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _participating = true;
            args.participating = _participating;
        } else {
            args.participating = false;
        }
        if (args.flags & (1 << 3)) {
            const _preparingResults = true;
            args.preparingResults = _preparingResults;
        } else {
            args.preparingResults = false;
        }
        const _startDate = reader.readInt();
        args.startDate = _startDate;
        if (args.flags & (1 << 1)) {
            const _joinedTooEarlyDate = reader.readInt();
            args.joinedTooEarlyDate = _joinedTooEarlyDate;
        } else {
            args.joinedTooEarlyDate = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _adminDisallowedChatId = reader.readLargeInt(64);
            args.adminDisallowedChatId = _adminDisallowedChatId;
        } else {
            args.adminDisallowedChatId = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _disallowedCountry = reader.tgReadString();
            args.disallowedCountry = _disallowedCountry;
        } else {
            args.disallowedCountry = undefined;
        }
        return new GiveawayInfo(args);
    }
}