import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdateReadHistoryOutbox extends TLObject {
    static CONSTRUCTOR_ID = 791617983;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateReadHistoryOutbox";
    static classType = "constructor";

    peer!: TypePeer;
    maxId!: number;
    pts!: number;
    ptsCount!: number;

    constructor(args: { peer?: TypePeer, maxId?: number, pts?: number, ptsCount?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.maxId = args.maxId!;
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(791617983, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.maxId);
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateReadHistoryOutbox {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        return new UpdateReadHistoryOutbox(args);
    }
}