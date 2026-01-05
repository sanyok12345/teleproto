import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BotVerifierSettings extends TLObject {
    static CONSTRUCTOR_ID = 2966251031;
    static SUBCLASS_OF_ID = 4057334604;
    static className = "BotVerifierSettings";
    static classType = "constructor";

    flags!: number;
    canModifyCustomDescription?: boolean;
    icon!: bigint;
    company!: string;
    customDescription?: string;

    constructor(args: { flags?: number, canModifyCustomDescription?: boolean, icon?: bigint, company?: string, customDescription?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.canModifyCustomDescription = args.canModifyCustomDescription;
        this.icon = args.icon!;
        this.company = args.company!;
        this.customDescription = args.customDescription;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2966251031, false);
        let flags = 0;
        if (this.canModifyCustomDescription) { flags |= 1 << 1; }
        if (this.customDescription !== undefined && this.customDescription !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.canModifyCustomDescription !== undefined && this.canModifyCustomDescription !== null) {
        }
        writer.writeLargeInt(this.icon, 64);
        writer.tgWriteString(this.company);
        if (this.customDescription !== undefined && this.customDescription !== null) {
            writer.tgWriteString(this.customDescription);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotVerifierSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _canModifyCustomDescription = true;
            args.canModifyCustomDescription = _canModifyCustomDescription;
        } else {
            args.canModifyCustomDescription = false;
        }
        const _icon = reader.readLargeInt(64);
        args.icon = _icon;
        const _company = reader.tgReadString();
        args.company = _company;
        if (args.flags & (1 << 0)) {
            const _customDescription = reader.tgReadString();
            args.customDescription = _customDescription;
        } else {
            args.customDescription = undefined;
        }
        return new BotVerifierSettings(args);
    }
}