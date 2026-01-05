import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeStoryFwdHeader } from "./TypeStoryFwdHeader";
import { TypeMessageEntity } from "./TypeMessageEntity";
import { TypeMessageMedia } from "./TypeMessageMedia";
import { TypeMediaArea } from "./TypeMediaArea";
import { TypePrivacyRule } from "./TypePrivacyRule";
import { TypeStoryViews } from "./TypeStoryViews";
import { TypeReaction } from "./TypeReaction";

export class StoryItem extends TLObject {
    static CONSTRUCTOR_ID = 3992020209;
    static SUBCLASS_OF_ID = 3564613939;
    static className = "StoryItem";
    static classType = "constructor";

    flags!: number;
    pinned?: boolean;
    public?: boolean;
    closeFriends?: boolean;
    min?: boolean;
    noforwards?: boolean;
    edited?: boolean;
    contacts?: boolean;
    selectedContacts?: boolean;
    out?: boolean;
    id!: number;
    date!: number;
    fromId?: TypePeer;
    fwdFrom?: TypeStoryFwdHeader;
    expireDate!: number;
    caption?: string;
    entities?: TypeMessageEntity[];
    media!: TypeMessageMedia;
    mediaAreas?: TypeMediaArea[];
    privacy?: TypePrivacyRule[];
    views?: TypeStoryViews;
    sentReaction?: TypeReaction;
    albums?: number[];

    constructor(args: { flags?: number, pinned?: boolean, public?: boolean, closeFriends?: boolean, min?: boolean, noforwards?: boolean, edited?: boolean, contacts?: boolean, selectedContacts?: boolean, out?: boolean, id?: number, date?: number, fromId?: TypePeer, fwdFrom?: TypeStoryFwdHeader, expireDate?: number, caption?: string, entities?: TypeMessageEntity[], media?: TypeMessageMedia, mediaAreas?: TypeMediaArea[], privacy?: TypePrivacyRule[], views?: TypeStoryViews, sentReaction?: TypeReaction, albums?: number[] } = {}) {
        super();
        this.flags = args.flags!;
        this.pinned = args.pinned;
        this.public = args.public;
        this.closeFriends = args.closeFriends;
        this.min = args.min;
        this.noforwards = args.noforwards;
        this.edited = args.edited;
        this.contacts = args.contacts;
        this.selectedContacts = args.selectedContacts;
        this.out = args.out;
        this.id = args.id!;
        this.date = args.date!;
        this.fromId = args.fromId;
        this.fwdFrom = args.fwdFrom;
        this.expireDate = args.expireDate!;
        this.caption = args.caption;
        this.entities = args.entities;
        this.media = args.media!;
        this.mediaAreas = args.mediaAreas;
        this.privacy = args.privacy;
        this.views = args.views;
        this.sentReaction = args.sentReaction;
        this.albums = args.albums;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3992020209, false);
        let flags = 0;
        if (this.pinned) { flags |= 1 << 5; }
        if (this.public) { flags |= 1 << 7; }
        if (this.closeFriends) { flags |= 1 << 8; }
        if (this.min) { flags |= 1 << 9; }
        if (this.noforwards) { flags |= 1 << 10; }
        if (this.edited) { flags |= 1 << 11; }
        if (this.contacts) { flags |= 1 << 12; }
        if (this.selectedContacts) { flags |= 1 << 13; }
        if (this.out) { flags |= 1 << 16; }
        if (this.fromId !== undefined && this.fromId !== null) { flags |= 1 << 18; }
        if (this.fwdFrom !== undefined && this.fwdFrom !== null) { flags |= 1 << 17; }
        if (this.caption !== undefined && this.caption !== null) { flags |= 1 << 0; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 1; }
        if (this.mediaAreas !== undefined && this.mediaAreas !== null) { flags |= 1 << 14; }
        if (this.privacy !== undefined && this.privacy !== null) { flags |= 1 << 2; }
        if (this.views !== undefined && this.views !== null) { flags |= 1 << 3; }
        if (this.sentReaction !== undefined && this.sentReaction !== null) { flags |= 1 << 15; }
        if (this.albums !== undefined && this.albums !== null) { flags |= 1 << 19; }
        writer.writeInt(flags, false);
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        if (this.public !== undefined && this.public !== null) {
        }
        if (this.closeFriends !== undefined && this.closeFriends !== null) {
        }
        if (this.min !== undefined && this.min !== null) {
        }
        if (this.noforwards !== undefined && this.noforwards !== null) {
        }
        if (this.edited !== undefined && this.edited !== null) {
        }
        if (this.contacts !== undefined && this.contacts !== null) {
        }
        if (this.selectedContacts !== undefined && this.selectedContacts !== null) {
        }
        if (this.out !== undefined && this.out !== null) {
        }
        writer.writeInt(this.id);
        writer.writeInt(this.date);
        if (this.fromId !== undefined && this.fromId !== null) {
            writer.write(this.fromId.getBytes());
        }
        if (this.fwdFrom !== undefined && this.fwdFrom !== null) {
            writer.write(this.fwdFrom.getBytes());
        }
        writer.writeInt(this.expireDate);
        if (this.caption !== undefined && this.caption !== null) {
            writer.tgWriteString(this.caption);
        }
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.write(this.media.getBytes());
        if (this.mediaAreas !== undefined && this.mediaAreas !== null) {
            writer.writeVector(this.mediaAreas, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.privacy !== undefined && this.privacy !== null) {
            writer.writeVector(this.privacy, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.views !== undefined && this.views !== null) {
            writer.write(this.views.getBytes());
        }
        if (this.sentReaction !== undefined && this.sentReaction !== null) {
            writer.write(this.sentReaction.getBytes());
        }
        if (this.albums !== undefined && this.albums !== null) {
            writer.writeVector(this.albums, (item) => {
                writer.writeInt(item);
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryItem {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 5)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        if (args.flags & (1 << 7)) {
            const _public = true;
            args.public = _public;
        } else {
            args.public = false;
        }
        if (args.flags & (1 << 8)) {
            const _closeFriends = true;
            args.closeFriends = _closeFriends;
        } else {
            args.closeFriends = false;
        }
        if (args.flags & (1 << 9)) {
            const _min = true;
            args.min = _min;
        } else {
            args.min = false;
        }
        if (args.flags & (1 << 10)) {
            const _noforwards = true;
            args.noforwards = _noforwards;
        } else {
            args.noforwards = false;
        }
        if (args.flags & (1 << 11)) {
            const _edited = true;
            args.edited = _edited;
        } else {
            args.edited = false;
        }
        if (args.flags & (1 << 12)) {
            const _contacts = true;
            args.contacts = _contacts;
        } else {
            args.contacts = false;
        }
        if (args.flags & (1 << 13)) {
            const _selectedContacts = true;
            args.selectedContacts = _selectedContacts;
        } else {
            args.selectedContacts = false;
        }
        if (args.flags & (1 << 16)) {
            const _out = true;
            args.out = _out;
        } else {
            args.out = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 18)) {
            const _fromId = reader.tgReadObject();
            args.fromId = _fromId;
        } else {
            args.fromId = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _fwdFrom = reader.tgReadObject();
            args.fwdFrom = _fwdFrom;
        } else {
            args.fwdFrom = undefined;
        }
        const _expireDate = reader.readInt();
        args.expireDate = _expireDate;
        if (args.flags & (1 << 0)) {
            const _caption = reader.tgReadString();
            args.caption = _caption;
        } else {
            args.caption = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        const _media = reader.tgReadObject();
        args.media = _media;
        if (args.flags & (1 << 14)) {
            const _mediaAreas = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.mediaAreas = _mediaAreas;
        } else {
            args.mediaAreas = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _privacy = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.privacy = _privacy;
        } else {
            args.privacy = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _views = reader.tgReadObject();
            args.views = _views;
        } else {
            args.views = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _sentReaction = reader.tgReadObject();
            args.sentReaction = _sentReaction;
        } else {
            args.sentReaction = undefined;
        }
        if (args.flags & (1 << 19)) {
            const _albums = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.albums = _albums;
        } else {
            args.albums = undefined;
        }
        return new StoryItem(args);
    }
}