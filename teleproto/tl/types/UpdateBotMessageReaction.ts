import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { MessageIDLike } from "./../../define";
import { TypeReaction } from "./TypeReaction";

export class UpdateBotMessageReaction extends TLObject {
    static CONSTRUCTOR_ID = 2887898062;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotMessageReaction";
    static classType = "constructor";

    peer!: TypePeer;
    msgId!: MessageIDLike;
    date!: number;
    actor!: TypePeer;
    oldReactions!: TypeReaction[];
    newReactions!: TypeReaction[];
    qts!: number;

    constructor(args: { peer?: TypePeer, msgId?: MessageIDLike, date?: number, actor?: TypePeer, oldReactions?: TypeReaction[], newReactions?: TypeReaction[], qts?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.msgId = args.msgId!;
        this.date = args.date!;
        this.actor = args.actor!;
        this.oldReactions = args.oldReactions!;
        this.newReactions = args.newReactions!;
        this.qts = args.qts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2887898062, false);
        writer.write(this.peer.getBytes());
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        writer.writeInt(this.date);
        writer.write(this.actor.getBytes());
        writer.writeVector(this.oldReactions, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.newReactions, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.qts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotMessageReaction {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _date = reader.readInt();
        args.date = _date;
        const _actor = reader.tgReadObject();
        args.actor = _actor;
        const _oldReactions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.oldReactions = _oldReactions;
        const _newReactions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.newReactions = _newReactions;
        const _qts = reader.readInt();
        args.qts = _qts;
        return new UpdateBotMessageReaction(args);
    }
}