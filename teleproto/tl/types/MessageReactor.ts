import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MessageReactor extends TLObject {
    static CONSTRUCTOR_ID = 1269016922;
    static SUBCLASS_OF_ID = 4030208697;
    static className = "MessageReactor";
    static classType = "constructor";

    flags!: number;
    top?: boolean;
    my?: boolean;
    anonymous?: boolean;
    peerId?: TypePeer;
    count!: number;

    constructor(args: { flags?: number, top?: boolean, my?: boolean, anonymous?: boolean, peerId?: TypePeer, count?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.top = args.top;
        this.my = args.my;
        this.anonymous = args.anonymous;
        this.peerId = args.peerId;
        this.count = args.count!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1269016922, false);
        let flags = 0;
        if (this.top) { flags |= 1 << 0; }
        if (this.my) { flags |= 1 << 1; }
        if (this.anonymous) { flags |= 1 << 2; }
        if (this.peerId !== undefined && this.peerId !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.top !== undefined && this.top !== null) {
        }
        if (this.my !== undefined && this.my !== null) {
        }
        if (this.anonymous !== undefined && this.anonymous !== null) {
        }
        if (this.peerId !== undefined && this.peerId !== null) {
            writer.write(this.peerId.getBytes());
        }
        writer.writeInt(this.count);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageReactor {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _top = true;
            args.top = _top;
        } else {
            args.top = false;
        }
        if (args.flags & (1 << 1)) {
            const _my = true;
            args.my = _my;
        } else {
            args.my = false;
        }
        if (args.flags & (1 << 2)) {
            const _anonymous = true;
            args.anonymous = _anonymous;
        } else {
            args.anonymous = false;
        }
        if (args.flags & (1 << 3)) {
            const _peerId = reader.tgReadObject();
            args.peerId = _peerId;
        } else {
            args.peerId = undefined;
        }
        const _count = reader.readInt();
        args.count = _count;
        return new MessageReactor(args);
    }
}