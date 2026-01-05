import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdatePendingJoinRequests extends TLObject {
    static CONSTRUCTOR_ID = 1885586395;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePendingJoinRequests";
    static classType = "constructor";

    peer!: TypePeer;
    requestsPending!: number;
    recentRequesters!: bigint[];

    constructor(args: { peer?: TypePeer, requestsPending?: number, recentRequesters?: bigint[] } = {}) {
        super();
        this.peer = args.peer!;
        this.requestsPending = args.requestsPending!;
        this.recentRequesters = args.recentRequesters!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1885586395, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.requestsPending);
        writer.writeVector(this.recentRequesters, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePendingJoinRequests {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _requestsPending = reader.readInt();
        args.requestsPending = _requestsPending;
        const _recentRequesters = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.recentRequesters = _recentRequesters;
        return new UpdatePendingJoinRequests(args);
    }
}