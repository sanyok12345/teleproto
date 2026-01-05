import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputFolderPeer } from "../../types/TypeInputFolderPeer";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditPeerFolders extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1749536939;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "folders.EditPeerFolders";
    static classType = "request";

    folderPeers!: TypeInputFolderPeer[];

    constructor(args: { folderPeers?: TypeInputFolderPeer[] } = {}) {
        super();
        this.folderPeers = args.folderPeers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1749536939, false);
        writer.writeVector(this.folderPeers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditPeerFolders {
        const args: any = {};
        const _folderPeers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.folderPeers = _folderPeers;
        return new EditPeerFolders(args);
    }
}