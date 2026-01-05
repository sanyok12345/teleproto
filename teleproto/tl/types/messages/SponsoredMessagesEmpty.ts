import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SponsoredMessagesEmpty extends TLObject {
    static CONSTRUCTOR_ID = 406407439;
    static SUBCLASS_OF_ID = 2134993376;
    static className = "messages.SponsoredMessagesEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(406407439, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SponsoredMessagesEmpty {
        const args: any = {};
        return new SponsoredMessagesEmpty(args);
    }
}