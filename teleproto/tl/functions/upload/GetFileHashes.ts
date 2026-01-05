import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputFileLocation } from "../../types/TypeInputFileLocation";
import { TypeFileHash } from "../../types/TypeFileHash";

export class GetFileHashes extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2438371370;
    static SUBCLASS_OF_ID = 2777941798;
    static className = "upload.GetFileHashes";
    static classType = "request";

    location!: TypeInputFileLocation;
    offset!: bigint;

    constructor(args: { location?: TypeInputFileLocation, offset?: bigint } = {}) {
        super();
        this.location = args.location!;
        this.offset = args.offset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2438371370, false);
        writer.write(this.location.getBytes());
        writer.writeLargeInt(this.offset, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeFileHash[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetFileHashes {
        const args: any = {};
        const _location = reader.tgReadObject();
        args.location = _location;
        const _offset = reader.readLargeInt(64);
        args.offset = _offset;
        return new GetFileHashes(args);
    }
}