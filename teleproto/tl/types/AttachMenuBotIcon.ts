import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocument } from "./TypeDocument";
import { TypeAttachMenuBotIconColor } from "./TypeAttachMenuBotIconColor";

export class AttachMenuBotIcon extends TLObject {
    static CONSTRUCTOR_ID = 2997303403;
    static SUBCLASS_OF_ID = 2152219989;
    static className = "AttachMenuBotIcon";
    static classType = "constructor";

    flags!: number;
    name!: string;
    icon!: TypeDocument;
    colors?: TypeAttachMenuBotIconColor[];

    constructor(args: { flags?: number, name?: string, icon?: TypeDocument, colors?: TypeAttachMenuBotIconColor[] } = {}) {
        super();
        this.flags = args.flags!;
        this.name = args.name!;
        this.icon = args.icon!;
        this.colors = args.colors;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2997303403, false);
        let flags = 0;
        if (this.colors !== undefined && this.colors !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.name);
        writer.write(this.icon.getBytes());
        if (this.colors !== undefined && this.colors !== null) {
            writer.writeVector(this.colors, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AttachMenuBotIcon {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _name = reader.tgReadString();
        args.name = _name;
        const _icon = reader.tgReadObject();
        args.icon = _icon;
        if (args.flags & (1 << 0)) {
            const _colors = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.colors = _colors;
        } else {
            args.colors = undefined;
        }
        return new AttachMenuBotIcon(args);
    }
}