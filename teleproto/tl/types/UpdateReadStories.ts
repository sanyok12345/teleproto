import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdateReadStories extends TLObject {
    static CONSTRUCTOR_ID = 4149121835;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateReadStories";
    static classType = "constructor";

    peer!: TypePeer;
    maxId!: number;

    constructor(args: { peer?: TypePeer, maxId?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.maxId = args.maxId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4149121835, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.maxId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateReadStories {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        return new UpdateReadStories(args);
    }
}