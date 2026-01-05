import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputMedia } from "../../types/TypeInputMedia";
import { TypeMessageMedia } from "../../types/TypeMessageMedia";

export class UploadMedia extends MTProtoRequest {
    static CONSTRUCTOR_ID = 345405816;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "messages.UploadMedia";
    static classType = "request";

    flags?: number;
    businessConnectionId?: string;
    peer?: EntityLike;
    media!: TypeInputMedia;

    constructor(args: { flags?: number, businessConnectionId?: string, peer?: EntityLike, media?: TypeInputMedia } = {}) {
        super();
        this.flags = args.flags;
        this.businessConnectionId = args.businessConnectionId;
        this.peer = args.peer;
        this.media = args.media!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(345405816, false);
        let flags = 0;
        if (this.businessConnectionId !== undefined && this.businessConnectionId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.businessConnectionId !== undefined && this.businessConnectionId !== null) {
            writer.tgWriteString(this.businessConnectionId);
        }
        writer.write((this.peer! as any).getBytes());
        writer.write(this.media.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessageMedia {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UploadMedia {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _businessConnectionId = reader.tgReadString();
            args.businessConnectionId = _businessConnectionId;
        } else {
            args.businessConnectionId = undefined;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _media = reader.tgReadObject();
        args.media = _media;
        return new UploadMedia(args);
    }
}