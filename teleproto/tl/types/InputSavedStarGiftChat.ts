import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputSavedStarGiftChat extends TLObject {
    static CONSTRUCTOR_ID = 4043418239;
    static SUBCLASS_OF_ID = 2406848942;
    static className = "InputSavedStarGiftChat";
    static classType = "constructor";

    peer!: TypeInputPeer;
    savedId!: bigint;

    constructor(args: { peer?: TypeInputPeer, savedId?: bigint } = {}) {
        super();
        this.peer = args.peer!;
        this.savedId = args.savedId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4043418239, false);
        writer.write(this.peer.getBytes());
        writer.writeLargeInt(this.savedId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputSavedStarGiftChat {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _savedId = reader.readLargeInt(64);
        args.savedId = _savedId;
        return new InputSavedStarGiftChat(args);
    }
}