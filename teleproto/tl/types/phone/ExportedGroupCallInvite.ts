import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ExportedGroupCallInvite extends TLObject {
    static CONSTRUCTOR_ID = 541839704;
    static SUBCLASS_OF_ID = 993787535;
    static className = "phone.ExportedGroupCallInvite";
    static classType = "constructor";

    link!: string;

    constructor(args: { link?: string } = {}) {
        super();
        this.link = args.link!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(541839704, false);
        writer.tgWriteString(this.link);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ExportedGroupCallInvite {
        const args: any = {};
        const _link = reader.tgReadString();
        args.link = _link;
        return new ExportedGroupCallInvite(args);
    }
}