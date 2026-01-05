import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BotVerification extends TLObject {
    static CONSTRUCTOR_ID = 4181513308;
    static SUBCLASS_OF_ID = 750730330;
    static className = "BotVerification";
    static classType = "constructor";

    botId!: bigint;
    icon!: bigint;
    description!: string;

    constructor(args: { botId?: bigint, icon?: bigint, description?: string } = {}) {
        super();
        this.botId = args.botId!;
        this.icon = args.icon!;
        this.description = args.description!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4181513308, false);
        writer.writeLargeInt(this.botId, 64);
        writer.writeLargeInt(this.icon, 64);
        writer.tgWriteString(this.description);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotVerification {
        const args: any = {};
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _icon = reader.readLargeInt(64);
        args.icon = _icon;
        const _description = reader.tgReadString();
        args.description = _description;
        return new BotVerification(args);
    }
}