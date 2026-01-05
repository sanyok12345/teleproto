import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePhoto } from "../TypePhoto";
import { TypeUser } from "../TypeUser";

export class PhotosSlice extends TLObject {
    static CONSTRUCTOR_ID = 352657236;
    static SUBCLASS_OF_ID = 667924839;
    static className = "photos.PhotosSlice";
    static classType = "constructor";

    count!: number;
    photos!: TypePhoto[];
    users!: TypeUser[];

    constructor(args: { count?: number, photos?: TypePhoto[], users?: TypeUser[] } = {}) {
        super();
        this.count = args.count!;
        this.photos = args.photos!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(352657236, false);
        writer.writeInt(this.count);
        writer.writeVector(this.photos, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhotosSlice {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _photos = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.photos = _photos;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new PhotosSlice(args);
    }
}