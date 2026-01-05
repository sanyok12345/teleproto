import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPhoto } from "./TypeInputPhoto";
import { TypeInputBotInlineMessage } from "./TypeInputBotInlineMessage";

export class InputBotInlineResultPhoto extends TLObject {
    static CONSTRUCTOR_ID = 2832753831;
    static SUBCLASS_OF_ID = 2158273502;
    static className = "InputBotInlineResultPhoto";
    static classType = "constructor";

    id!: string;
    type!: string;
    photo!: TypeInputPhoto;
    sendMessage!: TypeInputBotInlineMessage;

    constructor(args: { id?: string, type?: string, photo?: TypeInputPhoto, sendMessage?: TypeInputBotInlineMessage } = {}) {
        super();
        this.id = args.id!;
        this.type = args.type!;
        this.photo = args.photo!;
        this.sendMessage = args.sendMessage!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2832753831, false);
        writer.tgWriteString(this.id);
        writer.tgWriteString(this.type);
        writer.write(this.photo.getBytes());
        writer.write(this.sendMessage.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBotInlineResultPhoto {
        const args: any = {};
        const _id = reader.tgReadString();
        args.id = _id;
        const _type = reader.tgReadString();
        args.type = _type;
        const _photo = reader.tgReadObject();
        args.photo = _photo;
        const _sendMessage = reader.tgReadObject();
        args.sendMessage = _sendMessage;
        return new InputBotInlineResultPhoto(args);
    }
}