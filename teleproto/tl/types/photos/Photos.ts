import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePhoto } from "../TypePhoto";
import { TypeUser } from "../TypeUser";

export class Photos extends TLObject {
    static CONSTRUCTOR_ID = 2378853029;
    static SUBCLASS_OF_ID = 667924839;
    static className = "photos.Photos";
    static classType = "constructor";

    photos!: TypePhoto[];
    users!: TypeUser[];

    constructor(args: { photos?: TypePhoto[], users?: TypeUser[] } = {}) {
        super();
        this.photos = args.photos!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2378853029, false);
        writer.writeVector(this.photos, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Photos {
        const args: any = {};
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
        return new Photos(args);
    }
}