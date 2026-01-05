import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeBusinessBotRecipients } from "./TypeBusinessBotRecipients";
import { TypeBusinessBotRights } from "./TypeBusinessBotRights";

export class ConnectedBot extends TLObject {
    static CONSTRUCTOR_ID = 3445908332;
    static SUBCLASS_OF_ID = 904403870;
    static className = "ConnectedBot";
    static classType = "constructor";

    flags!: number;
    botId!: bigint;
    recipients!: TypeBusinessBotRecipients;
    rights!: TypeBusinessBotRights;

    constructor(args: { flags?: number, botId?: bigint, recipients?: TypeBusinessBotRecipients, rights?: TypeBusinessBotRights } = {}) {
        super();
        this.flags = args.flags!;
        this.botId = args.botId!;
        this.recipients = args.recipients!;
        this.rights = args.rights!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3445908332, false);
        let flags = 0;
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.botId, 64);
        writer.write(this.recipients.getBytes());
        writer.write(this.rights.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ConnectedBot {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _recipients = reader.tgReadObject();
        args.recipients = _recipients;
        const _rights = reader.tgReadObject();
        args.rights = _rights;
        return new ConnectedBot(args);
    }
}