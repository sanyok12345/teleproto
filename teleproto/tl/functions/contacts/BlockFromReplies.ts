import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { MessageIDLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class BlockFromReplies extends MTProtoRequest {
    static CONSTRUCTOR_ID = 698914348;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "contacts.BlockFromReplies";
    static classType = "request";

    flags?: number;
    deleteMessage?: boolean;
    deleteHistory?: boolean;
    reportSpam?: boolean;
    msgId?: MessageIDLike;

    constructor(args: { flags?: number, deleteMessage?: boolean, deleteHistory?: boolean, reportSpam?: boolean, msgId?: MessageIDLike } = {}) {
        super();
        this.flags = args.flags;
        this.deleteMessage = args.deleteMessage;
        this.deleteHistory = args.deleteHistory;
        this.reportSpam = args.reportSpam;
        this.msgId = args.msgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(698914348, false);
        let flags = 0;
        if (this.deleteMessage) { flags |= 1 << 0; }
        if (this.deleteHistory) { flags |= 1 << 1; }
        if (this.reportSpam) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.deleteMessage !== undefined && this.deleteMessage !== null) {
        }
        if (this.deleteHistory !== undefined && this.deleteHistory !== null) {
        }
        if (this.reportSpam !== undefined && this.reportSpam !== null) {
        }
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): BlockFromReplies {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _deleteMessage = true;
            args.deleteMessage = _deleteMessage;
        } else {
            args.deleteMessage = false;
        }
        if (args.flags & (1 << 1)) {
            const _deleteHistory = true;
            args.deleteHistory = _deleteHistory;
        } else {
            args.deleteHistory = false;
        }
        if (args.flags & (1 << 2)) {
            const _reportSpam = true;
            args.reportSpam = _reportSpam;
        } else {
            args.reportSpam = false;
        }
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new BlockFromReplies(args);
    }
}