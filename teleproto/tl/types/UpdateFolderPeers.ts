import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeFolderPeer } from "./TypeFolderPeer";

export class UpdateFolderPeers extends TLObject {
    static CONSTRUCTOR_ID = 422972864;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateFolderPeers";
    static classType = "constructor";

    folderPeers!: TypeFolderPeer[];
    pts!: number;
    ptsCount!: number;

    constructor(args: { folderPeers?: TypeFolderPeer[], pts?: number, ptsCount?: number } = {}) {
        super();
        this.folderPeers = args.folderPeers!;
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(422972864, false);
        writer.writeVector(this.folderPeers, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateFolderPeers {
        const args: any = {};
        const _folderPeers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.folderPeers = _folderPeers;
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        return new UpdateFolderPeers(args);
    }
}