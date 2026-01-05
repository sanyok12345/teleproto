import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputFileLocation } from "../../types/TypeInputFileLocation";
import { TypeFile } from "../../types/upload/TypeFile";

export class GetFile extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3193124286;
    static SUBCLASS_OF_ID = 1822152488;
    static className = "upload.GetFile";
    static classType = "request";

    flags?: number;
    precise?: boolean;
    cdnSupported?: boolean;
    location!: TypeInputFileLocation;
    offset!: bigint;
    limit!: number;

    constructor(args: { flags?: number, precise?: boolean, cdnSupported?: boolean, location?: TypeInputFileLocation, offset?: bigint, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.precise = args.precise;
        this.cdnSupported = args.cdnSupported;
        this.location = args.location!;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3193124286, false);
        let flags = 0;
        if (this.precise) { flags |= 1 << 0; }
        if (this.cdnSupported) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.precise !== undefined && this.precise !== null) {
        }
        if (this.cdnSupported !== undefined && this.cdnSupported !== null) {
        }
        writer.write(this.location.getBytes());
        writer.writeLargeInt(this.offset, 64);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeFile {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetFile {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _precise = true;
            args.precise = _precise;
        } else {
            args.precise = false;
        }
        if (args.flags & (1 << 1)) {
            const _cdnSupported = true;
            args.cdnSupported = _cdnSupported;
        } else {
            args.cdnSupported = false;
        }
        const _location = reader.tgReadObject();
        args.location = _location;
        const _offset = reader.readLargeInt(64);
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetFile(args);
    }
}