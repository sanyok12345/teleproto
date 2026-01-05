import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SponsoredMessageReportResultReported extends TLObject {
    static CONSTRUCTOR_ID = 2910423113;
    static SUBCLASS_OF_ID = 639834146;
    static className = "channels.SponsoredMessageReportResultReported";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2910423113, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SponsoredMessageReportResultReported {
        const args: any = {};
        return new SponsoredMessageReportResultReported(args);
    }
}