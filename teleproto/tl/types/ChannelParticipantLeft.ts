import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class ChannelParticipantLeft extends TLObject {
    static CONSTRUCTOR_ID = 453242886;
    static SUBCLASS_OF_ID = 3653762072;
    static className = "ChannelParticipantLeft";
    static classType = "constructor";

    peer!: TypePeer;

    constructor(args: { peer?: TypePeer } = {}) {
        super();
        this.peer = args.peer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(453242886, false);
        writer.write(this.peer.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipantLeft {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new ChannelParticipantLeft(args);
    }
}