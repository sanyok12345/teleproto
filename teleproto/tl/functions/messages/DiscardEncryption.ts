import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class DiscardEncryption extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4086541984;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.DiscardEncryption";
    static classType = "request";

    flags?: number;
    deleteHistory?: boolean;
    chatId!: number;

    constructor(args: { flags?: number, deleteHistory?: boolean, chatId?: number } = {}) {
        super();
        this.flags = args.flags;
        this.deleteHistory = args.deleteHistory;
        this.chatId = args.chatId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4086541984, false);
        let flags = 0;
        if (this.deleteHistory) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.deleteHistory !== undefined && this.deleteHistory !== null) {
        }
        writer.writeInt(this.chatId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DiscardEncryption {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _deleteHistory = true;
            args.deleteHistory = _deleteHistory;
        } else {
            args.deleteHistory = false;
        }
        const _chatId = reader.readInt();
        args.chatId = _chatId;
        return new DiscardEncryption(args);
    }
}