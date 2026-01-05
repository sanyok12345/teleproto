import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputDocument } from "./TypeInputDocument";

export class InputWebFileAudioAlbumThumbLocation extends TLObject {
    static CONSTRUCTOR_ID = 4100974884;
    static SUBCLASS_OF_ID = 4147042521;
    static className = "InputWebFileAudioAlbumThumbLocation";
    static classType = "constructor";

    flags!: number;
    small?: boolean;
    document?: TypeInputDocument;
    title?: string;
    performer?: string;

    constructor(args: { flags?: number, small?: boolean, document?: TypeInputDocument, title?: string, performer?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.small = args.small;
        this.document = args.document;
        this.title = args.title;
        this.performer = args.performer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4100974884, false);
        let flags = 0;
        if (this.small) { flags |= 1 << 2; }
        if (this.document !== undefined && this.document !== null) { flags |= 1 << 0; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 1; }
        if (this.performer !== undefined && this.performer !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.small !== undefined && this.small !== null) {
        }
        if (this.document !== undefined && this.document !== null) {
            writer.write(this.document.getBytes());
        }
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.performer !== undefined && this.performer !== null) {
            writer.tgWriteString(this.performer);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputWebFileAudioAlbumThumbLocation {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _small = true;
            args.small = _small;
        } else {
            args.small = false;
        }
        if (args.flags & (1 << 0)) {
            const _document = reader.tgReadObject();
            args.document = _document;
        } else {
            args.document = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _performer = reader.tgReadString();
            args.performer = _performer;
        } else {
            args.performer = undefined;
        }
        return new InputWebFileAudioAlbumThumbLocation(args);
    }
}