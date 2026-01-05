import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ChatThemesNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3759268292;
    static SUBCLASS_OF_ID = 364989096;
    static className = "account.ChatThemesNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3759268292, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatThemesNotModified {
        const args: any = {};
        return new ChatThemesNotModified(args);
    }
}