import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeEmojiGameOutcome } from "./messages/TypeEmojiGameOutcome";

export class MessageMediaDice extends TLObject {
    static CONSTRUCTOR_ID = 147581959;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaDice";
    static classType = "constructor";

    flags!: number;
    value!: number;
    emoticon!: string;
    gameOutcome?: TypeEmojiGameOutcome;

    constructor(args: { flags?: number, value?: number, emoticon?: string, gameOutcome?: TypeEmojiGameOutcome } = {}) {
        super();
        this.flags = args.flags!;
        this.value = args.value!;
        this.emoticon = args.emoticon!;
        this.gameOutcome = args.gameOutcome;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(147581959, false);
        let flags = 0;
        if (this.gameOutcome !== undefined && this.gameOutcome !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.value);
        writer.tgWriteString(this.emoticon);
        if (this.gameOutcome !== undefined && this.gameOutcome !== null) {
            writer.write(this.gameOutcome.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaDice {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _value = reader.readInt();
        args.value = _value;
        const _emoticon = reader.tgReadString();
        args.emoticon = _emoticon;
        if (args.flags & (1 << 0)) {
            const _gameOutcome = reader.tgReadObject();
            args.gameOutcome = _gameOutcome;
        } else {
            args.gameOutcome = undefined;
        }
        return new MessageMediaDice(args);
    }
}