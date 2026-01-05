import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class CheckQuickReplyShortcut extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4057005011;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.CheckQuickReplyShortcut";
    static classType = "request";

    shortcut!: string;

    constructor(args: { shortcut?: string } = {}) {
        super();
        this.shortcut = args.shortcut!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4057005011, false);
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

    static fromReader(reader: BinaryReader): CheckQuickReplyShortcut {
        const args: any = {};
        const _shortcut = reader.tgReadString();
        args.shortcut = _shortcut;
        return new CheckQuickReplyShortcut(args);
    }
}