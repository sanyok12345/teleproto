import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeTextWithEntities } from "../TypeTextWithEntities";
import { TypePeer } from "../TypePeer";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ChatlistInvite extends TLObject {
    static CONSTRUCTOR_ID = 4044279343;
    static SUBCLASS_OF_ID = 1097993845;
    static className = "chatlists.ChatlistInvite";
    static classType = "constructor";

    flags!: number;
    titleNoanimate?: boolean;
    title!: TypeTextWithEntities;
    emoticon?: string;
    peers!: TypePeer[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, titleNoanimate?: boolean, title?: TypeTextWithEntities, emoticon?: string, peers?: TypePeer[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.titleNoanimate = args.titleNoanimate;
        this.title = args.title!;
        this.emoticon = args.emoticon;
        this.peers = args.peers!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4044279343, false);
        let flags = 0;
        if (this.titleNoanimate) { flags |= 1 << 1; }
        if (this.emoticon !== undefined && this.emoticon !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.titleNoanimate !== undefined && this.titleNoanimate !== null) {
        }
        writer.write(this.title.getBytes());
        if (this.emoticon !== undefined && this.emoticon !== null) {
            writer.tgWriteString(this.emoticon);
        }
        writer.writeVector(this.peers, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatlistInvite {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _titleNoanimate = true;
            args.titleNoanimate = _titleNoanimate;
        } else {
            args.titleNoanimate = false;
        }
        const _title = reader.tgReadObject();
        args.title = _title;
        if (args.flags & (1 << 0)) {
            const _emoticon = reader.tgReadString();
            args.emoticon = _emoticon;
        } else {
            args.emoticon = undefined;
        }
        const _peers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peers = _peers;
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new ChatlistInvite(args);
    }
}