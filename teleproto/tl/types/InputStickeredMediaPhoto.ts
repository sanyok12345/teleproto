import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPhoto } from "./TypeInputPhoto";

export class InputStickeredMediaPhoto extends TLObject {
    static CONSTRUCTOR_ID = 1251549527;
    static SUBCLASS_OF_ID = 1363597726;
    static className = "InputStickeredMediaPhoto";
    static classType = "constructor";

    id!: TypeInputPhoto;

    constructor(args: { id?: TypeInputPhoto } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1251549527, false);
        writer.write(this.id.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickeredMediaPhoto {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        return new InputStickeredMediaPhoto(args);
    }
}