import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";

export class MessageMediaPhoto extends TLObject {
    static CONSTRUCTOR_ID = 1766936791;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaPhoto";
    static classType = "constructor";

    flags!: number;
    spoiler?: boolean;
    photo?: TypePhoto;
    ttlSeconds?: number;

    constructor(args: { flags?: number, spoiler?: boolean, photo?: TypePhoto, ttlSeconds?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.spoiler = args.spoiler;
        this.photo = args.photo;
        this.ttlSeconds = args.ttlSeconds;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1766936791, false);
        let flags = 0;
        if (this.spoiler) { flags |= 1 << 3; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 0; }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.spoiler !== undefined && this.spoiler !== null) {
        }
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) {
            writer.writeInt(this.ttlSeconds);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaPhoto {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _spoiler = true;
            args.spoiler = _spoiler;
        } else {
            args.spoiler = false;
        }
        if (args.flags & (1 << 0)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _ttlSeconds = reader.readInt();
            args.ttlSeconds = _ttlSeconds;
        } else {
            args.ttlSeconds = undefined;
        }
        return new MessageMediaPhoto(args);
    }
}