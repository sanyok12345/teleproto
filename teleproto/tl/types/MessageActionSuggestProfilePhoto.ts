import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";

export class MessageActionSuggestProfilePhoto extends TLObject {
    static CONSTRUCTOR_ID = 1474192222;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionSuggestProfilePhoto";
    static classType = "constructor";

    photo!: TypePhoto;

    constructor(args: { photo?: TypePhoto } = {}) {
        super();
        this.photo = args.photo!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1474192222, false);
        writer.write(this.photo.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionSuggestProfilePhoto {
        const args: any = {};
        const _photo = reader.tgReadObject();
        args.photo = _photo;
        return new MessageActionSuggestProfilePhoto(args);
    }
}