import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageMedia } from "./TypeMessageMedia";
import { TypeMessageEntity } from "./TypeMessageEntity";

export class UpdateShortSentMessage extends TLObject {
    static CONSTRUCTOR_ID = 2417352961;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "UpdateShortSentMessage";
    static classType = "constructor";

    flags!: number;
    out?: boolean;
    id!: number;
    pts!: number;
    ptsCount!: number;
    date!: number;
    media?: TypeMessageMedia;
    entities?: TypeMessageEntity[];
    ttlPeriod?: number;

    constructor(args: { flags?: number, out?: boolean, id?: number, pts?: number, ptsCount?: number, date?: number, media?: TypeMessageMedia, entities?: TypeMessageEntity[], ttlPeriod?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.out = args.out;
        this.id = args.id!;
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
        this.date = args.date!;
        this.media = args.media;
        this.entities = args.entities;
        this.ttlPeriod = args.ttlPeriod;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2417352961, false);
        let flags = 0;
        if (this.out) { flags |= 1 << 1; }
        if (this.media !== undefined && this.media !== null) { flags |= 1 << 9; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 7; }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) { flags |= 1 << 25; }
        writer.writeInt(flags, false);
        if (this.out !== undefined && this.out !== null) {
        }
        writer.writeInt(this.id);
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        writer.writeInt(this.date);
        if (this.media !== undefined && this.media !== null) {
            writer.write(this.media.getBytes());
        }
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) {
            writer.writeInt(this.ttlPeriod);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateShortSentMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _out = true;
            args.out = _out;
        } else {
            args.out = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 9)) {
            const _media = reader.tgReadObject();
            args.media = _media;
        } else {
            args.media = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        if (args.flags & (1 << 25)) {
            const _ttlPeriod = reader.readInt();
            args.ttlPeriod = _ttlPeriod;
        } else {
            args.ttlPeriod = undefined;
        }
        return new UpdateShortSentMessage(args);
    }
}