import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeer } from "../TypePeer";
import { TypeMessageEntity } from "../TypeMessageEntity";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ResolvedBusinessChatLinks extends TLObject {
    static CONSTRUCTOR_ID = 2586029857;
    static SUBCLASS_OF_ID = 980888616;
    static className = "account.ResolvedBusinessChatLinks";
    static classType = "constructor";

    flags!: number;
    peer!: TypePeer;
    message!: string;
    entities?: TypeMessageEntity[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, peer?: TypePeer, message?: string, entities?: TypeMessageEntity[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.peer = args.peer!;
        this.message = args.message!;
        this.entities = args.entities;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2586029857, false);
        let flags = 0;
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.peer.getBytes());
        writer.tgWriteString(this.message);
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ResolvedBusinessChatLinks {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _message = reader.tgReadString();
        args.message = _message;
        if (args.flags & (1 << 0)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
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
        return new ResolvedBusinessChatLinks(args);
    }
}