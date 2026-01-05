import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeReaction } from "../../types/TypeReaction";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendReaction extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3540875476;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SendReaction";
    static classType = "request";

    flags?: number;
    big?: boolean;
    addToRecent?: boolean;
    peer?: EntityLike;
    msgId?: MessageIDLike;
    reaction?: TypeReaction[];

    constructor(args: { flags?: number, big?: boolean, addToRecent?: boolean, peer?: EntityLike, msgId?: MessageIDLike, reaction?: TypeReaction[] } = {}) {
        super();
        this.flags = args.flags;
        this.big = args.big;
        this.addToRecent = args.addToRecent;
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.reaction = args.reaction;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3540875476, false);
        let flags = 0;
        if (this.big) { flags |= 1 << 1; }
        if (this.addToRecent) { flags |= 1 << 2; }
        if (this.reaction !== undefined && this.reaction !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.big !== undefined && this.big !== null) {
        }
        if (this.addToRecent !== undefined && this.addToRecent !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        if (this.reaction !== undefined && this.reaction !== null) {
            writer.writeVector(this.reaction, (item) => {
                writer.write(item.getBytes());
            });
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

    static fromReader(reader: BinaryReader): SendReaction {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _big = true;
            args.big = _big;
        } else {
            args.big = false;
        }
        if (args.flags & (1 << 2)) {
            const _addToRecent = true;
            args.addToRecent = _addToRecent;
        } else {
            args.addToRecent = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        if (args.flags & (1 << 0)) {
            const _reaction = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.reaction = _reaction;
        } else {
            args.reaction = undefined;
        }
        return new SendReaction(args);
    }
}