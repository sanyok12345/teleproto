import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputBotInlineMessage } from "./TypeInputBotInlineMessage";

export class InputBotInlineResultGame extends TLObject {
    static CONSTRUCTOR_ID = 1336154098;
    static SUBCLASS_OF_ID = 2158273502;
    static className = "InputBotInlineResultGame";
    static classType = "constructor";

    id!: string;
    shortName!: string;
    sendMessage!: TypeInputBotInlineMessage;

    constructor(args: { id?: string, shortName?: string, sendMessage?: TypeInputBotInlineMessage } = {}) {
        super();
        this.id = args.id!;
        this.shortName = args.shortName!;
        this.sendMessage = args.sendMessage!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1336154098, false);
        writer.tgWriteString(this.id);
        writer.tgWriteString(this.shortName);
        writer.write(this.sendMessage.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBotInlineResultGame {
        const args: any = {};
        const _id = reader.tgReadString();
        args.id = _id;
        const _shortName = reader.tgReadString();
        args.shortName = _shortName;
        const _sendMessage = reader.tgReadObject();
        args.sendMessage = _sendMessage;
        return new InputBotInlineResultGame(args);
    }
}