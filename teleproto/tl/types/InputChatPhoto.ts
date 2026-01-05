import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPhoto } from "./TypeInputPhoto";

export class InputChatPhoto extends TLObject {
    static CONSTRUCTOR_ID = 2303962423;
    static SUBCLASS_OF_ID = 3572182388;
    static className = "InputChatPhoto";
    static classType = "constructor";

    id!: TypeInputPhoto;

    constructor(args: { id?: TypeInputPhoto } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2303962423, false);
        writer.write(this.id.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputChatPhoto {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        return new InputChatPhoto(args);
    }
}