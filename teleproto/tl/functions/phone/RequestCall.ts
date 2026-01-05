import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypePhoneCallProtocol } from "../../types/TypePhoneCallProtocol";
import { TypePhoneCall } from "../../types/phone/TypePhoneCall";

export class RequestCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1124046573;
    static SUBCLASS_OF_ID = 3565878863;
    static className = "phone.RequestCall";
    static classType = "request";

    flags?: number;
    video?: boolean;
    userId!: EntityLike;
    randomId!: number;
    gAHash!: Buffer;
    protocol!: TypePhoneCallProtocol;

    constructor(args: { flags?: number, video?: boolean, userId?: EntityLike, randomId?: number, gAHash?: Buffer, protocol?: TypePhoneCallProtocol } = {}) {
        super();
        this.flags = args.flags;
        this.video = args.video;
        this.userId = args.userId!;
        this.randomId = args.randomId!;
        this.gAHash = args.gAHash!;
        this.protocol = args.protocol!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1124046573, false);
        let flags = 0;
        if (this.video) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.video !== undefined && this.video !== null) {
        }
        writer.write((this.userId as any).getBytes());
        writer.writeInt(this.randomId);
        writer.tgWriteBytes(this.gAHash);
        writer.write(this.protocol.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePhoneCall {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RequestCall {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _video = true;
            args.video = _video;
        } else {
            args.video = false;
        }
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _randomId = reader.readInt();
        args.randomId = _randomId;
        const _gAHash = reader.tgReadBytes();
        args.gAHash = _gAHash;
        const _protocol = reader.tgReadObject();
        args.protocol = _protocol;
        return new RequestCall(args);
    }
}