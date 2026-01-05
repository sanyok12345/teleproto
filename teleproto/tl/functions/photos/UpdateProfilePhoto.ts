import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputPhoto } from "../../types/TypeInputPhoto";
import { TypePhoto } from "../../types/photos/TypePhoto";

export class UpdateProfilePhoto extends MTProtoRequest {
    static CONSTRUCTOR_ID = 166207545;
    static SUBCLASS_OF_ID = 3264396580;
    static className = "photos.UpdateProfilePhoto";
    static classType = "request";

    flags?: number;
    fallback?: boolean;
    bot?: EntityLike;
    id?: TypeInputPhoto;

    constructor(args: { flags?: number, fallback?: boolean, bot?: EntityLike, id?: TypeInputPhoto } = {}) {
        super();
        this.flags = args.flags;
        this.fallback = args.fallback;
        this.bot = args.bot;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(166207545, false);
        let flags = 0;
        if (this.fallback) { flags |= 1 << 0; }
        if (this.bot !== undefined && this.bot !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.fallback !== undefined && this.fallback !== null) {
        }
        if (this.bot !== undefined && this.bot !== null) {
            writer.write((this.bot as any).getBytes());
        }
        writer.write(this.id!.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePhoto {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateProfilePhoto {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _fallback = true;
            args.fallback = _fallback;
        } else {
            args.fallback = false;
        }
        if (args.flags & (1 << 1)) {
            const _bot = reader.tgReadObject();
            args.bot = _bot;
        } else {
            args.bot = undefined;
        }
        const _id = reader.tgReadObject();
        args.id = _id;
        return new UpdateProfilePhoto(args);
    }
}