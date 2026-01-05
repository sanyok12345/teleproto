import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeReplyMarkup } from "./TypeReplyMarkup";

export class InputBotInlineMessageGame extends TLObject {
    static CONSTRUCTOR_ID = 1262639204;
    static SUBCLASS_OF_ID = 1408974864;
    static className = "InputBotInlineMessageGame";
    static classType = "constructor";

    flags!: number;
    replyMarkup?: TypeReplyMarkup;

    constructor(args: { flags?: number, replyMarkup?: TypeReplyMarkup } = {}) {
        super();
        this.flags = args.flags!;
        this.replyMarkup = args.replyMarkup;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1262639204, false);
        let flags = 0;
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) {
            writer.write(this.replyMarkup.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBotInlineMessageGame {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _replyMarkup = reader.tgReadObject();
            args.replyMarkup = _replyMarkup;
        } else {
            args.replyMarkup = undefined;
        }
        return new InputBotInlineMessageGame(args);
    }
}