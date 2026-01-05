import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class SendAsPeer extends TLObject {
    static CONSTRUCTOR_ID = 3088871476;
    static SUBCLASS_OF_ID = 1143177700;
    static className = "SendAsPeer";
    static classType = "constructor";

    flags!: number;
    premiumRequired?: boolean;
    peer!: TypePeer;

    constructor(args: { flags?: number, premiumRequired?: boolean, peer?: TypePeer } = {}) {
        super();
        this.flags = args.flags!;
        this.premiumRequired = args.premiumRequired;
        this.peer = args.peer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3088871476, false);
        let flags = 0;
        if (this.premiumRequired) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.premiumRequired !== undefined && this.premiumRequired !== null) {
        }
        writer.write(this.peer.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendAsPeer {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _premiumRequired = true;
            args.premiumRequired = _premiumRequired;
        } else {
            args.premiumRequired = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new SendAsPeer(args);
    }
}