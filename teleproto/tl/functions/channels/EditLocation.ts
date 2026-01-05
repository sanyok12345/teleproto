import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputGeoPoint } from "../../types/TypeInputGeoPoint";

export class EditLocation extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1491484525;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "channels.EditLocation";
    static classType = "request";

    channel?: EntityLike;
    geoPoint!: TypeInputGeoPoint;
    address!: string;

    constructor(args: { channel?: EntityLike, geoPoint?: TypeInputGeoPoint, address?: string } = {}) {
        super();
        this.channel = args.channel;
        this.geoPoint = args.geoPoint!;
        this.address = args.address!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1491484525, false);
        writer.write((this.channel! as any).getBytes());
        writer.write(this.geoPoint.getBytes());
        writer.tgWriteString(this.address);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditLocation {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _geoPoint = reader.tgReadObject();
        args.geoPoint = _geoPoint;
        const _address = reader.tgReadString();
        args.address = _address;
        return new EditLocation(args);
    }
}