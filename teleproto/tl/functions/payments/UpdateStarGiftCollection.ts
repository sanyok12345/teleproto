import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputSavedStarGift } from "../../types/TypeInputSavedStarGift";
import { TypeStarGiftCollection } from "../../types/TypeStarGiftCollection";

export class UpdateStarGiftCollection extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1339932391;
    static SUBCLASS_OF_ID = 1138805578;
    static className = "payments.UpdateStarGiftCollection";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    collectionId!: number;
    title?: string;
    deleteStargift?: TypeInputSavedStarGift[];
    addStargift?: TypeInputSavedStarGift[];
    order?: TypeInputSavedStarGift[];

    constructor(args: { flags?: number, peer?: EntityLike, collectionId?: number, title?: string, deleteStargift?: TypeInputSavedStarGift[], addStargift?: TypeInputSavedStarGift[], order?: TypeInputSavedStarGift[] } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.collectionId = args.collectionId!;
        this.title = args.title;
        this.deleteStargift = args.deleteStargift;
        this.addStargift = args.addStargift;
        this.order = args.order;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1339932391, false);
        let flags = 0;
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 0; }
        if (this.deleteStargift !== undefined && this.deleteStargift !== null) { flags |= 1 << 1; }
        if (this.addStargift !== undefined && this.addStargift !== null) { flags |= 1 << 2; }
        if (this.order !== undefined && this.order !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.collectionId);
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.deleteStargift !== undefined && this.deleteStargift !== null) {
            writer.writeVector(this.deleteStargift, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.addStargift !== undefined && this.addStargift !== null) {
            writer.writeVector(this.addStargift, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.order !== undefined && this.order !== null) {
            writer.writeVector(this.order, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarGiftCollection {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateStarGiftCollection {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _collectionId = reader.readInt();
        args.collectionId = _collectionId;
        if (args.flags & (1 << 0)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _deleteStargift = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.deleteStargift = _deleteStargift;
        } else {
            args.deleteStargift = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _addStargift = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.addStargift = _addStargift;
        } else {
            args.addStargift = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _order = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.order = _order;
        } else {
            args.order = undefined;
        }
        return new UpdateStarGiftCollection(args);
    }
}