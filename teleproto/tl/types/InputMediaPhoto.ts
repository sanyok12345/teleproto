import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPhoto } from "./TypeInputPhoto";

export class InputMediaPhoto extends TLObject {
    static CONSTRUCTOR_ID = 3015312949;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaPhoto";
    static classType = "constructor";

    flags!: number;
    spoiler?: boolean;
    id!: TypeInputPhoto;
    ttlSeconds?: number;

    constructor(args: { flags?: number, spoiler?: boolean, id?: TypeInputPhoto, ttlSeconds?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.spoiler = args.spoiler;
        this.id = args.id!;
        this.ttlSeconds = args.ttlSeconds;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3015312949, false);
        let flags = 0;
        if (this.spoiler) { flags |= 1 << 1; }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.spoiler !== undefined && this.spoiler !== null) {
        }
        writer.write(this.id.getBytes());
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) {
            writer.writeInt(this.ttlSeconds);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaPhoto {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _spoiler = true;
            args.spoiler = _spoiler;
        } else {
            args.spoiler = false;
        }
        const _id = reader.tgReadObject();
        args.id = _id;
        if (args.flags & (1 << 0)) {
            const _ttlSeconds = reader.readInt();
            args.ttlSeconds = _ttlSeconds;
        } else {
            args.ttlSeconds = undefined;
        }
        return new InputMediaPhoto(args);
    }
}