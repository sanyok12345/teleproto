import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class PaidReactionPrivacyPeer extends TLObject {
    static CONSTRUCTOR_ID = 3698130160;
    static SUBCLASS_OF_ID = 1708619318;
    static className = "PaidReactionPrivacyPeer";
    static classType = "constructor";

    peer!: TypeInputPeer;

    constructor(args: { peer?: TypeInputPeer } = {}) {
        super();
        this.peer = args.peer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3698130160, false);
        writer.write(this.peer.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaidReactionPrivacyPeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new PaidReactionPrivacyPeer(args);
    }
}