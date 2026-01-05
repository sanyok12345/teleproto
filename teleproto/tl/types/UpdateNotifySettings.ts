import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeNotifyPeer } from "./TypeNotifyPeer";
import { TypePeerNotifySettings } from "./TypePeerNotifySettings";

export class UpdateNotifySettings extends TLObject {
    static CONSTRUCTOR_ID = 3200411887;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateNotifySettings";
    static classType = "constructor";

    peer!: TypeNotifyPeer;
    notifySettings!: TypePeerNotifySettings;

    constructor(args: { peer?: TypeNotifyPeer, notifySettings?: TypePeerNotifySettings } = {}) {
        super();
        this.peer = args.peer!;
        this.notifySettings = args.notifySettings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3200411887, false);
        writer.write(this.peer.getBytes());
        writer.write(this.notifySettings.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateNotifySettings {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _notifySettings = reader.tgReadObject();
        args.notifySettings = _notifySettings;
        return new UpdateNotifySettings(args);
    }
}