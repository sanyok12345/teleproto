import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputWebFileLocation } from "../../types/TypeInputWebFileLocation";
import { TypeWebFile } from "../../types/upload/TypeWebFile";

export class GetWebFile extends MTProtoRequest {
    static CONSTRUCTOR_ID = 619086221;
    static SUBCLASS_OF_ID = 1760657233;
    static className = "upload.GetWebFile";
    static classType = "request";

    location!: TypeInputWebFileLocation;
    offset!: number;
    limit!: number;

    constructor(args: { location?: TypeInputWebFileLocation, offset?: number, limit?: number } = {}) {
        super();
        this.location = args.location!;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(619086221, false);
        writer.write(this.location.getBytes());
        writer.writeInt(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeWebFile {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetWebFile {
        const args: any = {};
        const _location = reader.tgReadObject();
        args.location = _location;
        const _offset = reader.readInt();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetWebFile(args);
    }
}