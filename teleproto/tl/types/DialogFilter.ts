import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTextWithEntities } from "./TypeTextWithEntities";
import { TypeInputPeer } from "./TypeInputPeer";

export class DialogFilter extends TLObject {
    static CONSTRUCTOR_ID = 2856789585;
    static SUBCLASS_OF_ID = 1764475991;
    static className = "DialogFilter";
    static classType = "constructor";

    flags!: number;
    contacts?: boolean;
    nonContacts?: boolean;
    groups?: boolean;
    broadcasts?: boolean;
    bots?: boolean;
    excludeMuted?: boolean;
    excludeRead?: boolean;
    excludeArchived?: boolean;
    titleNoanimate?: boolean;
    id!: number;
    title!: TypeTextWithEntities;
    emoticon?: string;
    color?: number;
    pinnedPeers!: TypeInputPeer[];
    includePeers!: TypeInputPeer[];
    excludePeers!: TypeInputPeer[];

    constructor(args: { flags?: number, contacts?: boolean, nonContacts?: boolean, groups?: boolean, broadcasts?: boolean, bots?: boolean, excludeMuted?: boolean, excludeRead?: boolean, excludeArchived?: boolean, titleNoanimate?: boolean, id?: number, title?: TypeTextWithEntities, emoticon?: string, color?: number, pinnedPeers?: TypeInputPeer[], includePeers?: TypeInputPeer[], excludePeers?: TypeInputPeer[] } = {}) {
        super();
        this.flags = args.flags!;
        this.contacts = args.contacts;
        this.nonContacts = args.nonContacts;
        this.groups = args.groups;
        this.broadcasts = args.broadcasts;
        this.bots = args.bots;
        this.excludeMuted = args.excludeMuted;
        this.excludeRead = args.excludeRead;
        this.excludeArchived = args.excludeArchived;
        this.titleNoanimate = args.titleNoanimate;
        this.id = args.id!;
        this.title = args.title!;
        this.emoticon = args.emoticon;
        this.color = args.color;
        this.pinnedPeers = args.pinnedPeers!;
        this.includePeers = args.includePeers!;
        this.excludePeers = args.excludePeers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2856789585, false);
        let flags = 0;
        if (this.contacts) { flags |= 1 << 0; }
        if (this.nonContacts) { flags |= 1 << 1; }
        if (this.groups) { flags |= 1 << 2; }
        if (this.broadcasts) { flags |= 1 << 3; }
        if (this.bots) { flags |= 1 << 4; }
        if (this.excludeMuted) { flags |= 1 << 11; }
        if (this.excludeRead) { flags |= 1 << 12; }
        if (this.excludeArchived) { flags |= 1 << 13; }
        if (this.titleNoanimate) { flags |= 1 << 28; }
        if (this.emoticon !== undefined && this.emoticon !== null) { flags |= 1 << 25; }
        if (this.color !== undefined && this.color !== null) { flags |= 1 << 27; }
        writer.writeInt(flags, false);
        if (this.contacts !== undefined && this.contacts !== null) {
        }
        if (this.nonContacts !== undefined && this.nonContacts !== null) {
        }
        if (this.groups !== undefined && this.groups !== null) {
        }
        if (this.broadcasts !== undefined && this.broadcasts !== null) {
        }
        if (this.bots !== undefined && this.bots !== null) {
        }
        if (this.excludeMuted !== undefined && this.excludeMuted !== null) {
        }
        if (this.excludeRead !== undefined && this.excludeRead !== null) {
        }
        if (this.excludeArchived !== undefined && this.excludeArchived !== null) {
        }
        if (this.titleNoanimate !== undefined && this.titleNoanimate !== null) {
        }
        writer.writeInt(this.id);
        writer.write(this.title.getBytes());
        if (this.emoticon !== undefined && this.emoticon !== null) {
            writer.tgWriteString(this.emoticon);
        }
        if (this.color !== undefined && this.color !== null) {
            writer.writeInt(this.color);
        }
        writer.writeVector(this.pinnedPeers, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.includePeers, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.excludePeers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DialogFilter {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _contacts = true;
            args.contacts = _contacts;
        } else {
            args.contacts = false;
        }
        if (args.flags & (1 << 1)) {
            const _nonContacts = true;
            args.nonContacts = _nonContacts;
        } else {
            args.nonContacts = false;
        }
        if (args.flags & (1 << 2)) {
            const _groups = true;
            args.groups = _groups;
        } else {
            args.groups = false;
        }
        if (args.flags & (1 << 3)) {
            const _broadcasts = true;
            args.broadcasts = _broadcasts;
        } else {
            args.broadcasts = false;
        }
        if (args.flags & (1 << 4)) {
            const _bots = true;
            args.bots = _bots;
        } else {
            args.bots = false;
        }
        if (args.flags & (1 << 11)) {
            const _excludeMuted = true;
            args.excludeMuted = _excludeMuted;
        } else {
            args.excludeMuted = false;
        }
        if (args.flags & (1 << 12)) {
            const _excludeRead = true;
            args.excludeRead = _excludeRead;
        } else {
            args.excludeRead = false;
        }
        if (args.flags & (1 << 13)) {
            const _excludeArchived = true;
            args.excludeArchived = _excludeArchived;
        } else {
            args.excludeArchived = false;
        }
        if (args.flags & (1 << 28)) {
            const _titleNoanimate = true;
            args.titleNoanimate = _titleNoanimate;
        } else {
            args.titleNoanimate = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        const _title = reader.tgReadObject();
        args.title = _title;
        if (args.flags & (1 << 25)) {
            const _emoticon = reader.tgReadString();
            args.emoticon = _emoticon;
        } else {
            args.emoticon = undefined;
        }
        if (args.flags & (1 << 27)) {
            const _color = reader.readInt();
            args.color = _color;
        } else {
            args.color = undefined;
        }
        const _pinnedPeers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.pinnedPeers = _pinnedPeers;
        const _includePeers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.includePeers = _includePeers;
        const _excludePeers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.excludePeers = _excludePeers;
        return new DialogFilter(args);
    }
}