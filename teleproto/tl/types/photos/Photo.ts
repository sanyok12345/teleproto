import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePhoto } from "../TypePhoto";
import { TypeUser } from "../TypeUser";

export class Photo extends TLObject {
    static CONSTRUCTOR_ID = 539045032;
    static SUBCLASS_OF_ID = 3264396580;
    static className = "photos.Photo";
    static classType = "constructor";

    photo!: TypePhoto;
    users!: TypeUser[];

    constructor(args: { photo?: TypePhoto, users?: TypeUser[] } = {}) {
        super();
        this.photo = args.photo!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(539045032, false);
        writer.write(this.photo.getBytes());
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Photo {
        const args: any = {};
        const _photo = reader.tgReadObject();
        args.photo = _photo;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new Photo(args);
    }
}