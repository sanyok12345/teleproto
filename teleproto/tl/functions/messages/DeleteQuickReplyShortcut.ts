import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class DeleteQuickReplyShortcut extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1019234112;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.DeleteQuickReplyShortcut";
    static classType = "request";

    shortcutId!: number;

    constructor(args: { shortcutId?: number } = {}) {
        super();
        this.shortcutId = args.shortcutId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1019234112, false);
        writer.writeInt(this.shortcutId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteQuickReplyShortcut {
        const args: any = {};
        const _shortcutId = reader.readInt();
        args.shortcutId = _shortcutId;
        return new DeleteQuickReplyShortcut(args);
    }
}