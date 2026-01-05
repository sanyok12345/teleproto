import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeEmojiGameInfo } from "./messages/TypeEmojiGameInfo";

export class UpdateEmojiGameInfo extends TLObject {
    static CONSTRUCTOR_ID = 4221326458;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateEmojiGameInfo";
    static classType = "constructor";

    info!: TypeEmojiGameInfo;

    constructor(args: { info?: TypeEmojiGameInfo } = {}) {
        super();
        this.info = args.info!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4221326458, false);
        writer.write(this.info.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateEmojiGameInfo {
        const args: any = {};
        const _info = reader.tgReadObject();
        args.info = _info;
        return new UpdateEmojiGameInfo(args);
    }
}