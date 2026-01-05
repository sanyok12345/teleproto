import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeChats } from "../../types/messages/TypeChats";

export class GetAdminedPublicChannels extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4172297903;
    static SUBCLASS_OF_ID = 2580925204;
    static className = "channels.GetAdminedPublicChannels";
    static classType = "request";

    flags?: number;
    byLocation?: boolean;
    checkLimit?: boolean;
    forPersonal?: boolean;

    constructor(args: { flags?: number, byLocation?: boolean, checkLimit?: boolean, forPersonal?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.byLocation = args.byLocation;
        this.checkLimit = args.checkLimit;
        this.forPersonal = args.forPersonal;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4172297903, false);
        let flags = 0;
        if (this.byLocation) { flags |= 1 << 0; }
        if (this.checkLimit) { flags |= 1 << 1; }
        if (this.forPersonal) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.byLocation !== undefined && this.byLocation !== null) {
        }
        if (this.checkLimit !== undefined && this.checkLimit !== null) {
        }
        if (this.forPersonal !== undefined && this.forPersonal !== null) {
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChats {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAdminedPublicChannels {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _byLocation = true;
            args.byLocation = _byLocation;
        } else {
            args.byLocation = false;
        }
        if (args.flags & (1 << 1)) {
            const _checkLimit = true;
            args.checkLimit = _checkLimit;
        } else {
            args.checkLimit = false;
        }
        if (args.flags & (1 << 2)) {
            const _forPersonal = true;
            args.forPersonal = _forPersonal;
        } else {
            args.forPersonal = false;
        }
        return new GetAdminedPublicChannels(args);
    }
}