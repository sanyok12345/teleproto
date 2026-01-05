import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGeoPoint } from "../../types/TypeInputGeoPoint";
import { TypeUpdates } from "../../types/TypeUpdates";

export class GetLocated extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3544759364;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "contacts.GetLocated";
    static classType = "request";

    flags?: number;
    background?: boolean;
    geoPoint!: TypeInputGeoPoint;
    selfExpires?: number;

    constructor(args: { flags?: number, background?: boolean, geoPoint?: TypeInputGeoPoint, selfExpires?: number } = {}) {
        super();
        this.flags = args.flags;
        this.background = args.background;
        this.geoPoint = args.geoPoint!;
        this.selfExpires = args.selfExpires;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3544759364, false);
        let flags = 0;
        if (this.background) { flags |= 1 << 1; }
        if (this.selfExpires !== undefined && this.selfExpires !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.background !== undefined && this.background !== null) {
        }
        writer.write(this.geoPoint.getBytes());
        if (this.selfExpires !== undefined && this.selfExpires !== null) {
            writer.writeInt(this.selfExpires);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetLocated {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _background = true;
            args.background = _background;
        } else {
            args.background = false;
        }
        const _geoPoint = reader.tgReadObject();
        args.geoPoint = _geoPoint;
        if (args.flags & (1 << 0)) {
            const _selfExpires = reader.readInt();
            args.selfExpires = _selfExpires;
        } else {
            args.selfExpires = undefined;
        }
        return new GetLocated(args);
    }
}