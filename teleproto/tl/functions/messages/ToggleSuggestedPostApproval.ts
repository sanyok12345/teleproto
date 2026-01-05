import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ToggleSuggestedPostApproval extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2164737372;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.ToggleSuggestedPostApproval";
    static classType = "request";

    flags?: number;
    reject?: boolean;
    peer?: EntityLike;
    msgId?: MessageIDLike;
    scheduleDate?: number;
    rejectComment?: string;

    constructor(args: { flags?: number, reject?: boolean, peer?: EntityLike, msgId?: MessageIDLike, scheduleDate?: number, rejectComment?: string } = {}) {
        super();
        this.flags = args.flags;
        this.reject = args.reject;
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.scheduleDate = args.scheduleDate;
        this.rejectComment = args.rejectComment;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2164737372, false);
        let flags = 0;
        if (this.reject) { flags |= 1 << 1; }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) { flags |= 1 << 0; }
        if (this.rejectComment !== undefined && this.rejectComment !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.reject !== undefined && this.reject !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) {
            writer.writeInt(this.scheduleDate);
        }
        if (this.rejectComment !== undefined && this.rejectComment !== null) {
            writer.tgWriteString(this.rejectComment);
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

    static fromReader(reader: BinaryReader): ToggleSuggestedPostApproval {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _reject = true;
            args.reject = _reject;
        } else {
            args.reject = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        if (args.flags & (1 << 0)) {
            const _scheduleDate = reader.readInt();
            args.scheduleDate = _scheduleDate;
        } else {
            args.scheduleDate = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _rejectComment = reader.tgReadString();
            args.rejectComment = _rejectComment;
        } else {
            args.rejectComment = undefined;
        }
        return new ToggleSuggestedPostApproval(args);
    }
}