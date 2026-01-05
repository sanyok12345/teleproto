import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BotCommand extends TLObject {
    static CONSTRUCTOR_ID = 3262826695;
    static SUBCLASS_OF_ID = 236872386;
    static className = "BotCommand";
    static classType = "constructor";

    command!: string;
    description!: string;

    constructor(args: { command?: string, description?: string } = {}) {
        super();
        this.command = args.command!;
        this.description = args.description!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3262826695, false);
        writer.tgWriteString(this.command);
        writer.tgWriteString(this.description);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotCommand {
        const args: any = {};
        const _command = reader.tgReadString();
        args.command = _command;
        const _description = reader.tgReadString();
        args.description = _description;
        return new BotCommand(args);
    }
}