import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MessageEmpty extends TLObject {
    static CONSTRUCTOR_ID = 2426849924;
    static SUBCLASS_OF_ID = 2030045667;
    static className = "MessageEmpty";
    static classType = "constructor";

    flags!: number;
    id!: number;
    peerId?: TypePeer;

    constructor(args: { flags?: number, id?: number, peerId?: TypePeer } = {}) {
        super();
        this.flags = args.flags!;
        this.id = args.id!;
        this.peerId = args.peerId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2426849924, false);
        let flags = 0;
        if (this.peerId !== undefined && this.peerId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.id);
        if (this.peerId !== undefined && this.peerId !== null) {
            writer.write(this.peerId.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageEmpty {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _id = reader.readInt();
        args.id = _id;
        if (args.flags & (1 << 0)) {
            const _peerId = reader.tgReadObject();
            args.peerId = _peerId;
        } else {
            args.peerId = undefined;
        }
        return new MessageEmpty(args);
    }
}