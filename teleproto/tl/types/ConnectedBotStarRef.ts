import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ConnectedBotStarRef extends TLObject {
    static CONSTRUCTOR_ID = 429997937;
    static SUBCLASS_OF_ID = 2689765260;
    static className = "ConnectedBotStarRef";
    static classType = "constructor";

    flags!: number;
    revoked?: boolean;
    url!: string;
    date!: number;
    botId!: bigint;
    commissionPermille!: number;
    durationMonths?: number;
    participants!: bigint;
    revenue!: bigint;

    constructor(args: { flags?: number, revoked?: boolean, url?: string, date?: number, botId?: bigint, commissionPermille?: number, durationMonths?: number, participants?: bigint, revenue?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.revoked = args.revoked;
        this.url = args.url!;
        this.date = args.date!;
        this.botId = args.botId!;
        this.commissionPermille = args.commissionPermille!;
        this.durationMonths = args.durationMonths;
        this.participants = args.participants!;
        this.revenue = args.revenue!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(429997937, false);
        let flags = 0;
        if (this.revoked) { flags |= 1 << 1; }
        if (this.durationMonths !== undefined && this.durationMonths !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.revoked !== undefined && this.revoked !== null) {
        }
        writer.tgWriteString(this.url);
        writer.writeInt(this.date);
        writer.writeLargeInt(this.botId, 64);
        writer.writeInt(this.commissionPermille);
        if (this.durationMonths !== undefined && this.durationMonths !== null) {
            writer.writeInt(this.durationMonths);
        }
        writer.writeLargeInt(this.participants, 64);
        writer.writeLargeInt(this.revenue, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ConnectedBotStarRef {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _revoked = true;
            args.revoked = _revoked;
        } else {
            args.revoked = false;
        }
        const _url = reader.tgReadString();
        args.url = _url;
        const _date = reader.readInt();
        args.date = _date;
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _commissionPermille = reader.readInt();
        args.commissionPermille = _commissionPermille;
        if (args.flags & (1 << 0)) {
            const _durationMonths = reader.readInt();
            args.durationMonths = _durationMonths;
        } else {
            args.durationMonths = undefined;
        }
        const _participants = reader.readLargeInt(64);
        args.participants = _participants;
        const _revenue = reader.readLargeInt(64);
        args.revenue = _revenue;
        return new ConnectedBotStarRef(args);
    }
}