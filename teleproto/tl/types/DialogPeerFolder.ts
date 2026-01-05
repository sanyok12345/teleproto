import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DialogPeerFolder extends TLObject {
    static CONSTRUCTOR_ID = 1363483106;
    static SUBCLASS_OF_ID = 627892654;
    static className = "DialogPeerFolder";
    static classType = "constructor";

    folderId!: number;

    constructor(args: { folderId?: number } = {}) {
        super();
        this.folderId = args.folderId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1363483106, false);
        writer.writeInt(this.folderId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DialogPeerFolder {
        const args: any = {};
        const _folderId = reader.readInt();
        args.folderId = _folderId;
        return new DialogPeerFolder(args);
    }
}