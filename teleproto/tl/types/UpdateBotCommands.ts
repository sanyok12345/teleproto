import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeBotCommand } from "./TypeBotCommand";

export class UpdateBotCommands extends TLObject {
    static CONSTRUCTOR_ID = 1299263278;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotCommands";
    static classType = "constructor";

    peer!: TypePeer;
    botId!: bigint;
    commands!: TypeBotCommand[];

    constructor(args: { peer?: TypePeer, botId?: bigint, commands?: TypeBotCommand[] } = {}) {
        super();
        this.peer = args.peer!;
        this.botId = args.botId!;
        this.commands = args.commands!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1299263278, false);
        writer.write(this.peer.getBytes());
        writer.writeLargeInt(this.botId, 64);
        writer.writeVector(this.commands, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotCommands {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _commands = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.commands = _commands;
        return new UpdateBotCommands(args);
    }
}