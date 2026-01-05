import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTextWithEntities } from "./TypeTextWithEntities";
import { TypeInputPeer } from "./TypeInputPeer";

export class DialogFilterChatlist extends TLObject {
    static CONSTRUCTOR_ID = 2522053591;
    static SUBCLASS_OF_ID = 1764475991;
    static className = "DialogFilterChatlist";
    static classType = "constructor";

    flags!: number;
    hasMyInvites?: boolean;
    titleNoanimate?: boolean;
    id!: number;
    title!: TypeTextWithEntities;
    emoticon?: string;
    color?: number;
    pinnedPeers!: TypeInputPeer[];
    includePeers!: TypeInputPeer[];

    constructor(args: { flags?: number, hasMyInvites?: boolean, titleNoanimate?: boolean, id?: number, title?: TypeTextWithEntities, emoticon?: string, color?: number, pinnedPeers?: TypeInputPeer[], includePeers?: TypeInputPeer[] } = {}) {
        super();
        this.flags = args.flags!;
        this.hasMyInvites = args.hasMyInvites;
        this.titleNoanimate = args.titleNoanimate;
        this.id = args.id!;
        this.title = args.title!;
        this.emoticon = args.emoticon;
        this.color = args.color;
        this.pinnedPeers = args.pinnedPeers!;
        this.includePeers = args.includePeers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2522053591, false);
        let flags = 0;
        if (this.hasMyInvites) { flags |= 1 << 26; }
        if (this.titleNoanimate) { flags |= 1 << 28; }
        if (this.emoticon !== undefined && this.emoticon !== null) { flags |= 1 << 25; }
        if (this.color !== undefined && this.color !== null) { flags |= 1 << 27; }
        writer.writeInt(flags, false);
        if (this.hasMyInvites !== undefined && this.hasMyInvites !== null) {
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
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DialogFilterChatlist {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 26)) {
            const _hasMyInvites = true;
            args.hasMyInvites = _hasMyInvites;
        } else {
            args.hasMyInvites = false;
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
        return new DialogFilterChatlist(args);
    }
}