import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypePeerSettings } from "./TypePeerSettings";

export class UpdatePeerSettings extends TLObject {
    static CONSTRUCTOR_ID = 1786671974;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePeerSettings";
    static classType = "constructor";

    peer!: TypePeer;
    settings!: TypePeerSettings;

    constructor(args: { peer?: TypePeer, settings?: TypePeerSettings } = {}) {
        super();
        this.peer = args.peer!;
        this.settings = args.settings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1786671974, false);
        writer.write(this.peer.getBytes());
        writer.write(this.settings.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePeerSettings {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        return new UpdatePeerSettings(args);
    }
}