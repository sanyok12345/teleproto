import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageMedia } from "./TypeMessageMedia";
import { TypeMessageEntity } from "./TypeMessageEntity";

export class UpdateServiceNotification extends TLObject {
    static CONSTRUCTOR_ID = 3957614617;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateServiceNotification";
    static classType = "constructor";

    flags!: number;
    popup?: boolean;
    invertMedia?: boolean;
    inboxDate?: number;
    type!: string;
    message!: string;
    media!: TypeMessageMedia;
    entities!: TypeMessageEntity[];

    constructor(args: { flags?: number, popup?: boolean, invertMedia?: boolean, inboxDate?: number, type?: string, message?: string, media?: TypeMessageMedia, entities?: TypeMessageEntity[] } = {}) {
        super();
        this.flags = args.flags!;
        this.popup = args.popup;
        this.invertMedia = args.invertMedia;
        this.inboxDate = args.inboxDate;
        this.type = args.type!;
        this.message = args.message!;
        this.media = args.media!;
        this.entities = args.entities!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3957614617, false);
        let flags = 0;
        if (this.popup) { flags |= 1 << 0; }
        if (this.invertMedia) { flags |= 1 << 2; }
        if (this.inboxDate !== undefined && this.inboxDate !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.popup !== undefined && this.popup !== null) {
        }
        if (this.invertMedia !== undefined && this.invertMedia !== null) {
        }
        if (this.inboxDate !== undefined && this.inboxDate !== null) {
            writer.writeInt(this.inboxDate);
        }
        writer.tgWriteString(this.type);
        writer.tgWriteString(this.message);
        writer.write(this.media.getBytes());
        writer.writeVector(this.entities, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateServiceNotification {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _popup = true;
            args.popup = _popup;
        } else {
            args.popup = false;
        }
        if (args.flags & (1 << 2)) {
            const _invertMedia = true;
            args.invertMedia = _invertMedia;
        } else {
            args.invertMedia = false;
        }
        if (args.flags & (1 << 1)) {
            const _inboxDate = reader.readInt();
            args.inboxDate = _inboxDate;
        } else {
            args.inboxDate = undefined;
        }
        const _type = reader.tgReadString();
        args.type = _type;
        const _message = reader.tgReadString();
        args.message = _message;
        const _media = reader.tgReadObject();
        args.media = _media;
        const _entities = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.entities = _entities;
        return new UpdateServiceNotification(args);
    }
}