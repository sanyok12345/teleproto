import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageEntity } from "./TypeMessageEntity";
import { TypePhoto } from "./TypePhoto";
import { TypeMessageMedia } from "./TypeMessageMedia";
import { TypePeerColor } from "./TypePeerColor";

export class SponsoredMessage extends TLObject {
    static CONSTRUCTOR_ID = 2109703795;
    static SUBCLASS_OF_ID = 3780630582;
    static className = "SponsoredMessage";
    static classType = "constructor";

    flags!: number;
    recommended?: boolean;
    canReport?: boolean;
    randomId!: Buffer;
    url!: string;
    title!: string;
    message!: string;
    entities?: TypeMessageEntity[];
    photo?: TypePhoto;
    media?: TypeMessageMedia;
    color?: TypePeerColor;
    buttonText!: string;
    sponsorInfo?: string;
    additionalInfo?: string;
    minDisplayDuration?: number;
    maxDisplayDuration?: number;

    constructor(args: { flags?: number, recommended?: boolean, canReport?: boolean, randomId?: Buffer, url?: string, title?: string, message?: string, entities?: TypeMessageEntity[], photo?: TypePhoto, media?: TypeMessageMedia, color?: TypePeerColor, buttonText?: string, sponsorInfo?: string, additionalInfo?: string, minDisplayDuration?: number, maxDisplayDuration?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.recommended = args.recommended;
        this.canReport = args.canReport;
        this.randomId = args.randomId!;
        this.url = args.url!;
        this.title = args.title!;
        this.message = args.message!;
        this.entities = args.entities;
        this.photo = args.photo;
        this.media = args.media;
        this.color = args.color;
        this.buttonText = args.buttonText!;
        this.sponsorInfo = args.sponsorInfo;
        this.additionalInfo = args.additionalInfo;
        this.minDisplayDuration = args.minDisplayDuration;
        this.maxDisplayDuration = args.maxDisplayDuration;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2109703795, false);
        let flags = 0;
        if (this.recommended) { flags |= 1 << 5; }
        if (this.canReport) { flags |= 1 << 12; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 1; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 6; }
        if (this.media !== undefined && this.media !== null) { flags |= 1 << 14; }
        if (this.color !== undefined && this.color !== null) { flags |= 1 << 13; }
        if (this.sponsorInfo !== undefined && this.sponsorInfo !== null) { flags |= 1 << 7; }
        if (this.additionalInfo !== undefined && this.additionalInfo !== null) { flags |= 1 << 8; }
        if (this.minDisplayDuration !== undefined && this.minDisplayDuration !== null) { flags |= 1 << 15; }
        if (this.maxDisplayDuration !== undefined && this.maxDisplayDuration !== null) { flags |= 1 << 15; }
        writer.writeInt(flags, false);
        if (this.recommended !== undefined && this.recommended !== null) {
        }
        if (this.canReport !== undefined && this.canReport !== null) {
        }
        writer.tgWriteBytes(this.randomId);
        writer.tgWriteString(this.url);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.message);
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        if (this.media !== undefined && this.media !== null) {
            writer.write(this.media.getBytes());
        }
        if (this.color !== undefined && this.color !== null) {
            writer.write(this.color.getBytes());
        }
        writer.tgWriteString(this.buttonText);
        if (this.sponsorInfo !== undefined && this.sponsorInfo !== null) {
            writer.tgWriteString(this.sponsorInfo);
        }
        if (this.additionalInfo !== undefined && this.additionalInfo !== null) {
            writer.tgWriteString(this.additionalInfo);
        }
        if (this.minDisplayDuration !== undefined && this.minDisplayDuration !== null) {
            writer.writeInt(this.minDisplayDuration);
        }
        if (this.maxDisplayDuration !== undefined && this.maxDisplayDuration !== null) {
            writer.writeInt(this.maxDisplayDuration);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SponsoredMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 5)) {
            const _recommended = true;
            args.recommended = _recommended;
        } else {
            args.recommended = false;
        }
        if (args.flags & (1 << 12)) {
            const _canReport = true;
            args.canReport = _canReport;
        } else {
            args.canReport = false;
        }
        const _randomId = reader.tgReadBytes();
        args.randomId = _randomId;
        const _url = reader.tgReadString();
        args.url = _url;
        const _title = reader.tgReadString();
        args.title = _title;
        const _message = reader.tgReadString();
        args.message = _message;
        if (args.flags & (1 << 1)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _media = reader.tgReadObject();
            args.media = _media;
        } else {
            args.media = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _color = reader.tgReadObject();
            args.color = _color;
        } else {
            args.color = undefined;
        }
        const _buttonText = reader.tgReadString();
        args.buttonText = _buttonText;
        if (args.flags & (1 << 7)) {
            const _sponsorInfo = reader.tgReadString();
            args.sponsorInfo = _sponsorInfo;
        } else {
            args.sponsorInfo = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _additionalInfo = reader.tgReadString();
            args.additionalInfo = _additionalInfo;
        } else {
            args.additionalInfo = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _minDisplayDuration = reader.readInt();
            args.minDisplayDuration = _minDisplayDuration;
        } else {
            args.minDisplayDuration = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _maxDisplayDuration = reader.readInt();
            args.maxDisplayDuration = _maxDisplayDuration;
        } else {
            args.maxDisplayDuration = undefined;
        }
        return new SponsoredMessage(args);
    }
}