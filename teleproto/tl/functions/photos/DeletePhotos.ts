import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPhoto } from "../../types/TypeInputPhoto";

export class DeletePhotos extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2278522671;
    static SUBCLASS_OF_ID = 2300109160;
    static className = "photos.DeletePhotos";
    static classType = "request";

    id?: TypeInputPhoto[];

    constructor(args: { id?: TypeInputPhoto[] } = {}) {
        super();
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2278522671, false);
        writer.writeVector(this.id!, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): bigint[] {
        const result = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeletePhotos {
        const args: any = {};
        const _id = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.id = _id;
        return new DeletePhotos(args);
    }
}