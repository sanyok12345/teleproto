import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePeerColor } from "../../types/TypePeerColor";

export class UpdateColor extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1749885262;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.UpdateColor";
    static classType = "request";

    flags?: number;
    forProfile?: boolean;
    color?: TypePeerColor;

    constructor(args: { flags?: number, forProfile?: boolean, color?: TypePeerColor } = {}) {
        super();
        this.flags = args.flags;
        this.forProfile = args.forProfile;
        this.color = args.color;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1749885262, false);
        let flags = 0;
        if (this.forProfile) { flags |= 1 << 1; }
        if (this.color !== undefined && this.color !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.forProfile !== undefined && this.forProfile !== null) {
        }
        if (this.color !== undefined && this.color !== null) {
            writer.write(this.color.getBytes());
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

    static fromReader(reader: BinaryReader): UpdateColor {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _forProfile = true;
            args.forProfile = _forProfile;
        } else {
            args.forProfile = false;
        }
        if (args.flags & (1 << 2)) {
            const _color = reader.tgReadObject();
            args.color = _color;
        } else {
            args.color = undefined;
        }
        return new UpdateColor(args);
    }
}