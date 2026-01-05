import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class PeerColorsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 732034510;
    static SUBCLASS_OF_ID = 239036211;
    static className = "help.PeerColorsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(732034510, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerColorsNotModified {
        const args: any = {};
        return new PeerColorsNotModified(args);
    }
}