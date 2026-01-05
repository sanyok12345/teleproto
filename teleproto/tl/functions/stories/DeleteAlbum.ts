import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class DeleteAlbum extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2369017552;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "stories.DeleteAlbum";
    static classType = "request";

    peer?: EntityLike;
    albumId!: number;

    constructor(args: { peer?: EntityLike, albumId?: number } = {}) {
        super();
        this.peer = args.peer;
        this.albumId = args.albumId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2369017552, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.albumId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteAlbum {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _albumId = reader.readInt();
        args.albumId = _albumId;
        return new DeleteAlbum(args);
    }
}