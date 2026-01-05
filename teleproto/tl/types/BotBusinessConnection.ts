import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeBusinessBotRights } from "./TypeBusinessBotRights";

export class BotBusinessConnection extends TLObject {
    static CONSTRUCTOR_ID = 2402595573;
    static SUBCLASS_OF_ID = 2601715014;
    static className = "BotBusinessConnection";
    static classType = "constructor";

    flags!: number;
    disabled?: boolean;
    connectionId!: string;
    userId!: bigint;
    dcId!: number;
    date!: number;
    rights?: TypeBusinessBotRights;

    constructor(args: { flags?: number, disabled?: boolean, connectionId?: string, userId?: bigint, dcId?: number, date?: number, rights?: TypeBusinessBotRights } = {}) {
        super();
        this.flags = args.flags!;
        this.disabled = args.disabled;
        this.connectionId = args.connectionId!;
        this.userId = args.userId!;
        this.dcId = args.dcId!;
        this.date = args.date!;
        this.rights = args.rights;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2402595573, false);
        let flags = 0;
        if (this.disabled) { flags |= 1 << 1; }
        if (this.rights !== undefined && this.rights !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.disabled !== undefined && this.disabled !== null) {
        }
        writer.tgWriteString(this.connectionId);
        writer.writeLargeInt(this.userId, 64);
        writer.writeInt(this.dcId);
        writer.writeInt(this.date);
        if (this.rights !== undefined && this.rights !== null) {
            writer.write(this.rights.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotBusinessConnection {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _disabled = true;
            args.disabled = _disabled;
        } else {
            args.disabled = false;
        }
        const _connectionId = reader.tgReadString();
        args.connectionId = _connectionId;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 2)) {
            const _rights = reader.tgReadObject();
            args.rights = _rights;
        } else {
            args.rights = undefined;
        }
        return new BotBusinessConnection(args);
    }
}