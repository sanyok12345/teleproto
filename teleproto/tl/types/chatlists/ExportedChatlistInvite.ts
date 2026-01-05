import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDialogFilter } from "../TypeDialogFilter";
import { TypeExportedChatlistInvite } from "../TypeExportedChatlistInvite";

export class ExportedChatlistInvite extends TLObject {
    static CONSTRUCTOR_ID = 283567014;
    static SUBCLASS_OF_ID = 3261681385;
    static className = "chatlists.ExportedChatlistInvite";
    static classType = "constructor";

    filter!: TypeDialogFilter;
    invite!: TypeExportedChatlistInvite;

    constructor(args: { filter?: TypeDialogFilter, invite?: TypeExportedChatlistInvite } = {}) {
        super();
        this.filter = args.filter!;
        this.invite = args.invite!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(283567014, false);
        writer.write(this.filter.getBytes());
        writer.write(this.invite.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ExportedChatlistInvite {
        const args: any = {};
        const _filter = reader.tgReadObject();
        args.filter = _filter;
        const _invite = reader.tgReadObject();
        args.invite = _invite;
        return new ExportedChatlistInvite(args);
    }
}