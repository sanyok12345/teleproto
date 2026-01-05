import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeAutoSaveSettings } from "./TypeAutoSaveSettings";

export class AutoSaveException extends TLObject {
    static CONSTRUCTOR_ID = 2170563911;
    static SUBCLASS_OF_ID = 3716579625;
    static className = "AutoSaveException";
    static classType = "constructor";

    peer!: TypePeer;
    settings!: TypeAutoSaveSettings;

    constructor(args: { peer?: TypePeer, settings?: TypeAutoSaveSettings } = {}) {
        super();
        this.peer = args.peer!;
        this.settings = args.settings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2170563911, false);
        writer.write(this.peer.getBytes());
        writer.write(this.settings.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AutoSaveException {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        return new AutoSaveException(args);
    }
}