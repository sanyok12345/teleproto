import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class BotCommandScopePeer extends TLObject {
    static CONSTRUCTOR_ID = 3684534653;
    static SUBCLASS_OF_ID = 1269783824;
    static className = "BotCommandScopePeer";
    static classType = "constructor";

    peer!: TypeInputPeer;

    constructor(args: { peer?: TypeInputPeer } = {}) {
        super();
        this.peer = args.peer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3684534653, false);
        writer.write(this.peer.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotCommandScopePeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new BotCommandScopePeer(args);
    }
}