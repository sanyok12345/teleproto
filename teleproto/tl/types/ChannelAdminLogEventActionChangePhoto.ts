import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";

export class ChannelAdminLogEventActionChangePhoto extends TLObject {
    static CONSTRUCTOR_ID = 1129042607;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionChangePhoto";
    static classType = "constructor";

    prevPhoto!: TypePhoto;
    newPhoto!: TypePhoto;

    constructor(args: { prevPhoto?: TypePhoto, newPhoto?: TypePhoto } = {}) {
        super();
        this.prevPhoto = args.prevPhoto!;
        this.newPhoto = args.newPhoto!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1129042607, false);
        writer.write(this.prevPhoto.getBytes());
        writer.write(this.newPhoto.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionChangePhoto {
        const args: any = {};
        const _prevPhoto = reader.tgReadObject();
        args.prevPhoto = _prevPhoto;
        const _newPhoto = reader.tgReadObject();
        args.newPhoto = _newPhoto;
        return new ChannelAdminLogEventActionChangePhoto(args);
    }
}