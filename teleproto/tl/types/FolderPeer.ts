import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class FolderPeer extends TLObject {
    static CONSTRUCTOR_ID = 3921323624;
    static SUBCLASS_OF_ID = 4092733499;
    static className = "FolderPeer";
    static classType = "constructor";

    peer!: TypePeer;
    folderId!: number;

    constructor(args: { peer?: TypePeer, folderId?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.folderId = args.folderId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3921323624, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.folderId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FolderPeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _folderId = reader.readInt();
        args.folderId = _folderId;
        return new FolderPeer(args);
    }
}