import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class EditQuickReplyShortcut extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1543519471;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.EditQuickReplyShortcut";
    static classType = "request";

    shortcutId!: number;
    shortcut!: string;

    constructor(args: { shortcutId?: number, shortcut?: string } = {}) {
        super();
        this.shortcutId = args.shortcutId!;
        this.shortcut = args.shortcut!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1543519471, false);
        writer.writeInt(this.shortcutId);
        writer.tgWriteString(this.shortcut);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditQuickReplyShortcut {
        const args: any = {};
        const _shortcutId = reader.readInt();
        args.shortcutId = _shortcutId;
        const _shortcut = reader.tgReadString();
        args.shortcut = _shortcut;
        return new EditQuickReplyShortcut(args);
    }
}