import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocument } from "./TypeDocument";
import { TypePhoto } from "./TypePhoto";

export class MessageMediaDocument extends TLObject {
    static CONSTRUCTOR_ID = 1389939929;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaDocument";
    static classType = "constructor";

    flags!: number;
    nopremium?: boolean;
    spoiler?: boolean;
    video?: boolean;
    round?: boolean;
    voice?: boolean;
    document?: TypeDocument;
    altDocuments?: TypeDocument[];
    videoCover?: TypePhoto;
    videoTimestamp?: number;
    ttlSeconds?: number;

    constructor(args: { flags?: number, nopremium?: boolean, spoiler?: boolean, video?: boolean, round?: boolean, voice?: boolean, document?: TypeDocument, altDocuments?: TypeDocument[], videoCover?: TypePhoto, videoTimestamp?: number, ttlSeconds?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.nopremium = args.nopremium;
        this.spoiler = args.spoiler;
        this.video = args.video;
        this.round = args.round;
        this.voice = args.voice;
        this.document = args.document;
        this.altDocuments = args.altDocuments;
        this.videoCover = args.videoCover;
        this.videoTimestamp = args.videoTimestamp;
        this.ttlSeconds = args.ttlSeconds;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1389939929, false);
        let flags = 0;
        if (this.nopremium) { flags |= 1 << 3; }
        if (this.spoiler) { flags |= 1 << 4; }
        if (this.video) { flags |= 1 << 6; }
        if (this.round) { flags |= 1 << 7; }
        if (this.voice) { flags |= 1 << 8; }
        if (this.document !== undefined && this.document !== null) { flags |= 1 << 0; }
        if (this.altDocuments !== undefined && this.altDocuments !== null) { flags |= 1 << 5; }
        if (this.videoCover !== undefined && this.videoCover !== null) { flags |= 1 << 9; }
        if (this.videoTimestamp !== undefined && this.videoTimestamp !== null) { flags |= 1 << 10; }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.nopremium !== undefined && this.nopremium !== null) {
        }
        if (this.spoiler !== undefined && this.spoiler !== null) {
        }
        if (this.video !== undefined && this.video !== null) {
        }
        if (this.round !== undefined && this.round !== null) {
        }
        if (this.voice !== undefined && this.voice !== null) {
        }
        if (this.document !== undefined && this.document !== null) {
            writer.write(this.document.getBytes());
        }
        if (this.altDocuments !== undefined && this.altDocuments !== null) {
            writer.writeVector(this.altDocuments, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.videoCover !== undefined && this.videoCover !== null) {
            writer.write(this.videoCover.getBytes());
        }
        if (this.videoTimestamp !== undefined && this.videoTimestamp !== null) {
            writer.writeInt(this.videoTimestamp);
        }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) {
            writer.writeInt(this.ttlSeconds);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaDocument {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _nopremium = true;
            args.nopremium = _nopremium;
        } else {
            args.nopremium = false;
        }
        if (args.flags & (1 << 4)) {
            const _spoiler = true;
            args.spoiler = _spoiler;
        } else {
            args.spoiler = false;
        }
        if (args.flags & (1 << 6)) {
            const _video = true;
            args.video = _video;
        } else {
            args.video = false;
        }
        if (args.flags & (1 << 7)) {
            const _round = true;
            args.round = _round;
        } else {
            args.round = false;
        }
        if (args.flags & (1 << 8)) {
            const _voice = true;
            args.voice = _voice;
        } else {
            args.voice = false;
        }
        if (args.flags & (1 << 0)) {
            const _document = reader.tgReadObject();
            args.document = _document;
        } else {
            args.document = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _altDocuments = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.altDocuments = _altDocuments;
        } else {
            args.altDocuments = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _videoCover = reader.tgReadObject();
            args.videoCover = _videoCover;
        } else {
            args.videoCover = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _videoTimestamp = reader.readInt();
            args.videoTimestamp = _videoTimestamp;
        } else {
            args.videoTimestamp = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _ttlSeconds = reader.readInt();
            args.ttlSeconds = _ttlSeconds;
        } else {
            args.ttlSeconds = undefined;
        }
        return new MessageMediaDocument(args);
    }
}