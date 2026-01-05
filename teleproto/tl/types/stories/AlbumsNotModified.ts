import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class AlbumsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 1448008427;
    static SUBCLASS_OF_ID = 94846265;
    static className = "stories.AlbumsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1448008427, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AlbumsNotModified {
        const args: any = {};
        return new AlbumsNotModified(args);
    }
}