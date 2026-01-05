import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatPhoto } from "./TypeChatPhoto";

export class Folder extends TLObject {
    static CONSTRUCTOR_ID = 4283715173;
    static SUBCLASS_OF_ID = 3943566587;
    static className = "Folder";
    static classType = "constructor";

    flags!: number;
    autofillNewBroadcasts?: boolean;
    autofillPublicGroups?: boolean;
    autofillNewCorrespondents?: boolean;
    id!: number;
    title!: string;
    photo?: TypeChatPhoto;

    constructor(args: { flags?: number, autofillNewBroadcasts?: boolean, autofillPublicGroups?: boolean, autofillNewCorrespondents?: boolean, id?: number, title?: string, photo?: TypeChatPhoto } = {}) {
        super();
        this.flags = args.flags!;
        this.autofillNewBroadcasts = args.autofillNewBroadcasts;
        this.autofillPublicGroups = args.autofillPublicGroups;
        this.autofillNewCorrespondents = args.autofillNewCorrespondents;
        this.id = args.id!;
        this.title = args.title!;
        this.photo = args.photo;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4283715173, false);
        let flags = 0;
        if (this.autofillNewBroadcasts) { flags |= 1 << 0; }
        if (this.autofillPublicGroups) { flags |= 1 << 1; }
        if (this.autofillNewCorrespondents) { flags |= 1 << 2; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.autofillNewBroadcasts !== undefined && this.autofillNewBroadcasts !== null) {
        }
        if (this.autofillPublicGroups !== undefined && this.autofillPublicGroups !== null) {
        }
        if (this.autofillNewCorrespondents !== undefined && this.autofillNewCorrespondents !== null) {
        }
        writer.writeInt(this.id);
        writer.tgWriteString(this.title);
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Folder {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _autofillNewBroadcasts = true;
            args.autofillNewBroadcasts = _autofillNewBroadcasts;
        } else {
            args.autofillNewBroadcasts = false;
        }
        if (args.flags & (1 << 1)) {
            const _autofillPublicGroups = true;
            args.autofillPublicGroups = _autofillPublicGroups;
        } else {
            args.autofillPublicGroups = false;
        }
        if (args.flags & (1 << 2)) {
            const _autofillNewCorrespondents = true;
            args.autofillNewCorrespondents = _autofillNewCorrespondents;
        } else {
            args.autofillNewCorrespondents = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        const _title = reader.tgReadString();
        args.title = _title;
        if (args.flags & (1 << 3)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        return new Folder(args);
    }
}