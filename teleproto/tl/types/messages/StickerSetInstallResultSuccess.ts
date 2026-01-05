import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class StickerSetInstallResultSuccess extends TLObject {
    static CONSTRUCTOR_ID = 946083368;
    static SUBCLASS_OF_ID = 1741373416;
    static className = "messages.StickerSetInstallResultSuccess";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(946083368, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StickerSetInstallResultSuccess {
        const args: any = {};
        return new StickerSetInstallResultSuccess(args);
    }
}