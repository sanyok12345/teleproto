import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatBannedRights } from "./TypeChatBannedRights";

export class ChannelAdminLogEventActionDefaultBannedRights extends TLObject {
    static CONSTRUCTOR_ID = 771095562;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionDefaultBannedRights";
    static classType = "constructor";

    prevBannedRights!: TypeChatBannedRights;
    newBannedRights!: TypeChatBannedRights;

    constructor(args: { prevBannedRights?: TypeChatBannedRights, newBannedRights?: TypeChatBannedRights } = {}) {
        super();
        this.prevBannedRights = args.prevBannedRights!;
        this.newBannedRights = args.newBannedRights!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(771095562, false);
        writer.write(this.prevBannedRights.getBytes());
        writer.write(this.newBannedRights.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionDefaultBannedRights {
        const args: any = {};
        const _prevBannedRights = reader.tgReadObject();
        args.prevBannedRights = _prevBannedRights;
        const _newBannedRights = reader.tgReadObject();
        args.newBannedRights = _newBannedRights;
        return new ChannelAdminLogEventActionDefaultBannedRights(args);
    }
}