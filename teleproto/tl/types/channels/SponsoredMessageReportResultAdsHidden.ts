import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SponsoredMessageReportResultAdsHidden extends TLObject {
    static CONSTRUCTOR_ID = 1044107055;
    static SUBCLASS_OF_ID = 639834146;
    static className = "channels.SponsoredMessageReportResultAdsHidden";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1044107055, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SponsoredMessageReportResultAdsHidden {
        const args: any = {};
        return new SponsoredMessageReportResultAdsHidden(args);
    }
}