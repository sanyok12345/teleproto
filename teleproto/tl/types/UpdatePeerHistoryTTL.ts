import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdatePeerHistoryTTL extends TLObject {
    static CONSTRUCTOR_ID = 3147544997;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePeerHistoryTTL";
    static classType = "constructor";

    flags!: number;
    peer!: TypePeer;
    ttlPeriod?: number;

    constructor(args: { flags?: number, peer?: TypePeer, ttlPeriod?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.peer = args.peer!;
        this.ttlPeriod = args.ttlPeriod;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3147544997, false);
        let flags = 0;
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.peer.getBytes());
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) {
            writer.writeInt(this.ttlPeriod);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePeerHistoryTTL {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _ttlPeriod = reader.readInt();
            args.ttlPeriod = _ttlPeriod;
        } else {
            args.ttlPeriod = undefined;
        }
        return new UpdatePeerHistoryTTL(args);
    }
}