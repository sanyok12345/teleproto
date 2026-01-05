import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputFolderPeer extends TLObject {
    static CONSTRUCTOR_ID = 4224893590;
    static SUBCLASS_OF_ID = 1954700800;
    static className = "InputFolderPeer";
    static classType = "constructor";

    peer!: TypeInputPeer;
    folderId!: number;

    constructor(args: { peer?: TypeInputPeer, folderId?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.folderId = args.folderId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4224893590, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.folderId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputFolderPeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _folderId = reader.readInt();
        args.folderId = _folderId;
        return new InputFolderPeer(args);
    }
}