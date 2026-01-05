import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeGroupCall } from "./TypeGroupCall";

export class UpdateGroupCall extends TLObject {
    static CONSTRUCTOR_ID = 2636256992;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateGroupCall";
    static classType = "constructor";

    flags!: number;
    liveStory?: boolean;
    peer?: TypePeer;
    call!: TypeGroupCall;

    constructor(args: { flags?: number, liveStory?: boolean, peer?: TypePeer, call?: TypeGroupCall } = {}) {
        super();
        this.flags = args.flags!;
        this.liveStory = args.liveStory;
        this.peer = args.peer;
        this.call = args.call!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2636256992, false);
        let flags = 0;
        if (this.liveStory) { flags |= 1 << 2; }
        if (this.peer !== undefined && this.peer !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.liveStory !== undefined && this.liveStory !== null) {
        }
        if (this.peer !== undefined && this.peer !== null) {
            writer.write(this.peer.getBytes());
        }
        writer.write(this.call.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateGroupCall {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _liveStory = true;
            args.liveStory = _liveStory;
        } else {
            args.liveStory = false;
        }
        if (args.flags & (1 << 1)) {
            const _peer = reader.tgReadObject();
            args.peer = _peer;
        } else {
            args.peer = undefined;
        }
        const _call = reader.tgReadObject();
        args.call = _call;
        return new UpdateGroupCall(args);
    }
}