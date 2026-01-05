import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { MessageIDLike } from "./../../define";
import { TypeReactionCount } from "./TypeReactionCount";

export class UpdateBotMessageReactions extends TLObject {
    static CONSTRUCTOR_ID = 164329305;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotMessageReactions";
    static classType = "constructor";

    peer!: TypePeer;
    msgId!: MessageIDLike;
    date!: number;
    reactions!: TypeReactionCount[];
    qts!: number;

    constructor(args: { peer?: TypePeer, msgId?: MessageIDLike, date?: number, reactions?: TypeReactionCount[], qts?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.msgId = args.msgId!;
        this.date = args.date!;
        this.reactions = args.reactions!;
        this.qts = args.qts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(164329305, false);
        writer.write(this.peer.getBytes());
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        writer.writeInt(this.date);
        writer.writeVector(this.reactions, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.qts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotMessageReactions {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _date = reader.readInt();
        args.date = _date;
        const _reactions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.reactions = _reactions;
        const _qts = reader.readInt();
        args.qts = _qts;
        return new UpdateBotMessageReactions(args);
    }
}