import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SponsoredPeersEmpty extends TLObject {
    static CONSTRUCTOR_ID = 3929191601;
    static SUBCLASS_OF_ID = 3026017484;
    static className = "contacts.SponsoredPeersEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3929191601, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SponsoredPeersEmpty {
        const args: any = {};
        return new SponsoredPeersEmpty(args);
    }
}