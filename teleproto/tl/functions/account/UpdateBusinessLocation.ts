import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGeoPoint } from "../../types/TypeInputGeoPoint";

export class UpdateBusinessLocation extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2657817370;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.UpdateBusinessLocation";
    static classType = "request";

    flags?: number;
    geoPoint?: TypeInputGeoPoint;
    address?: string;

    constructor(args: { flags?: number, geoPoint?: TypeInputGeoPoint, address?: string } = {}) {
        super();
        this.flags = args.flags;
        this.geoPoint = args.geoPoint;
        this.address = args.address;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2657817370, false);
        let flags = 0;
        if (this.geoPoint !== undefined && this.geoPoint !== null) { flags |= 1 << 1; }
        if (this.address !== undefined && this.address !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.geoPoint !== undefined && this.geoPoint !== null) {
            writer.write(this.geoPoint.getBytes());
        }
        if (this.address !== undefined && this.address !== null) {
            writer.tgWriteString(this.address);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateBusinessLocation {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _geoPoint = reader.tgReadObject();
            args.geoPoint = _geoPoint;
        } else {
            args.geoPoint = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _address = reader.tgReadString();
            args.address = _address;
        } else {
            args.address = undefined;
        }
        return new UpdateBusinessLocation(args);
    }
}