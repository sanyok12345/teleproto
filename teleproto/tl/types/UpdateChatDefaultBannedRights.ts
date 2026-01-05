import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeChatBannedRights } from "./TypeChatBannedRights";

export class UpdateChatDefaultBannedRights extends TLObject {
    static CONSTRUCTOR_ID = 1421875280;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChatDefaultBannedRights";
    static classType = "constructor";

    peer!: TypePeer;
    defaultBannedRights!: TypeChatBannedRights;
    version!: number;

    constructor(args: { peer?: TypePeer, defaultBannedRights?: TypeChatBannedRights, version?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.defaultBannedRights = args.defaultBannedRights!;
        this.version = args.version!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1421875280, false);
        writer.write(this.peer.getBytes());
        writer.write(this.defaultBannedRights.getBytes());
        writer.writeInt(this.version);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChatDefaultBannedRights {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _defaultBannedRights = reader.tgReadObject();
        args.defaultBannedRights = _defaultBannedRights;
        const _version = reader.readInt();
        args.version = _version;
        return new UpdateChatDefaultBannedRights(args);
    }
}