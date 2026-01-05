import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeBoost } from "./TypeBoost";

export class UpdateBotChatBoost extends TLObject {
    static CONSTRUCTOR_ID = 2421019804;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotChatBoost";
    static classType = "constructor";

    peer!: TypePeer;
    boost!: TypeBoost;
    qts!: number;

    constructor(args: { peer?: TypePeer, boost?: TypeBoost, qts?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.boost = args.boost!;
        this.qts = args.qts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2421019804, false);
        writer.write(this.peer.getBytes());
        writer.write(this.boost.getBytes());
        writer.writeInt(this.qts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotChatBoost {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _boost = reader.tgReadObject();
        args.boost = _boost;
        const _qts = reader.readInt();
        args.qts = _qts;
        return new UpdateBotChatBoost(args);
    }
}