import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";

export class MessageActionChatEditPhoto extends TLObject {
    static CONSTRUCTOR_ID = 2144015272;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionChatEditPhoto";
    static classType = "constructor";

    photo!: TypePhoto;

    constructor(args: { photo?: TypePhoto } = {}) {
        super();
        this.photo = args.photo!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2144015272, false);
        writer.write(this.photo.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionChatEditPhoto {
        const args: any = {};
        const _photo = reader.tgReadObject();
        args.photo = _photo;
        return new MessageActionChatEditPhoto(args);
    }
}