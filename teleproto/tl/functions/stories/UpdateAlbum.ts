import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStoryAlbum } from "../../types/TypeStoryAlbum";

export class UpdateAlbum extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1582455222;
    static SUBCLASS_OF_ID = 2089574050;
    static className = "stories.UpdateAlbum";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    albumId!: number;
    title?: string;
    deleteStories?: number[];
    addStories?: number[];
    order?: number[];

    constructor(args: { flags?: number, peer?: EntityLike, albumId?: number, title?: string, deleteStories?: number[], addStories?: number[], order?: number[] } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.albumId = args.albumId!;
        this.title = args.title;
        this.deleteStories = args.deleteStories;
        this.addStories = args.addStories;
        this.order = args.order;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1582455222, false);
        let flags = 0;
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 0; }
        if (this.deleteStories !== undefined && this.deleteStories !== null) { flags |= 1 << 1; }
        if (this.addStories !== undefined && this.addStories !== null) { flags |= 1 << 2; }
        if (this.order !== undefined && this.order !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.albumId);
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.deleteStories !== undefined && this.deleteStories !== null) {
            writer.writeVector(this.deleteStories, (item) => {
                writer.writeInt(item);
            });
        }
        if (this.addStories !== undefined && this.addStories !== null) {
            writer.writeVector(this.addStories, (item) => {
                writer.writeInt(item);
            });
        }
        if (this.order !== undefined && this.order !== null) {
            writer.writeVector(this.order, (item) => {
                writer.writeInt(item);
            });
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStoryAlbum {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateAlbum {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _albumId = reader.readInt();
        args.albumId = _albumId;
        if (args.flags & (1 << 0)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _deleteStories = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.deleteStories = _deleteStories;
        } else {
            args.deleteStories = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _addStories = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.addStories = _addStories;
        } else {
            args.addStories = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _order = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.order = _order;
        } else {
            args.order = undefined;
        }
        return new UpdateAlbum(args);
    }
}