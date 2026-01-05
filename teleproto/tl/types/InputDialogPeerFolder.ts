import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputDialogPeerFolder extends TLObject {
    static CONSTRUCTOR_ID = 1684014375;
    static SUBCLASS_OF_ID = 2719782805;
    static className = "InputDialogPeerFolder";
    static classType = "constructor";

    folderId!: number;

    constructor(args: { folderId?: number } = {}) {
        super();
        this.folderId = args.folderId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1684014375, false);
        writer.writeInt(this.folderId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputDialogPeerFolder {
        const args: any = {};
        const _folderId = reader.readInt();
        args.folderId = _folderId;
        return new InputDialogPeerFolder(args);
    }
}