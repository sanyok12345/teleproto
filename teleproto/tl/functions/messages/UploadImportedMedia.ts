import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputMedia } from "../../types/TypeInputMedia";
import { TypeMessageMedia } from "../../types/TypeMessageMedia";

export class UploadImportedMedia extends MTProtoRequest {
    static CONSTRUCTOR_ID = 713433234;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "messages.UploadImportedMedia";
    static classType = "request";

    peer?: EntityLike;
    importId!: bigint;
    fileName!: string;
    media!: TypeInputMedia;

    constructor(args: { peer?: EntityLike, importId?: bigint, fileName?: string, media?: TypeInputMedia } = {}) {
        super();
        this.peer = args.peer;
        this.importId = args.importId!;
        this.fileName = args.fileName!;
        this.media = args.media!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(713433234, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeLargeInt(this.importId, 64);
        writer.tgWriteString(this.fileName);
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

    static fromReader(reader: BinaryReader): UploadImportedMedia {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _importId = reader.readLargeInt(64);
        args.importId = _importId;
        const _fileName = reader.tgReadString();
        args.fileName = _fileName;
        const _media = reader.tgReadObject();
        args.media = _media;
        return new UploadImportedMedia(args);
    }
}