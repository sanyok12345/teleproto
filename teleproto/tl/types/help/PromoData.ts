import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeer } from "../TypePeer";
import { TypePendingSuggestion } from "../TypePendingSuggestion";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class PromoData extends TLObject {
    static CONSTRUCTOR_ID = 145021050;
    static SUBCLASS_OF_ID = 2639877442;
    static className = "help.PromoData";
    static classType = "constructor";

    flags!: number;
    proxy?: boolean;
    expires!: number;
    peer?: TypePeer;
    psaType?: string;
    psaMessage?: string;
    pendingSuggestions!: string[];
    dismissedSuggestions!: string[];
    customPendingSuggestion?: TypePendingSuggestion;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, proxy?: boolean, expires?: number, peer?: TypePeer, psaType?: string, psaMessage?: string, pendingSuggestions?: string[], dismissedSuggestions?: string[], customPendingSuggestion?: TypePendingSuggestion, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.proxy = args.proxy;
        this.expires = args.expires!;
        this.peer = args.peer;
        this.psaType = args.psaType;
        this.psaMessage = args.psaMessage;
        this.pendingSuggestions = args.pendingSuggestions!;
        this.dismissedSuggestions = args.dismissedSuggestions!;
        this.customPendingSuggestion = args.customPendingSuggestion;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(145021050, false);
        let flags = 0;
        if (this.proxy) { flags |= 1 << 0; }
        if (this.peer !== undefined && this.peer !== null) { flags |= 1 << 3; }
        if (this.psaType !== undefined && this.psaType !== null) { flags |= 1 << 1; }
        if (this.psaMessage !== undefined && this.psaMessage !== null) { flags |= 1 << 2; }
        if (this.customPendingSuggestion !== undefined && this.customPendingSuggestion !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.proxy !== undefined && this.proxy !== null) {
        }
        writer.writeInt(this.expires);
        if (this.peer !== undefined && this.peer !== null) {
            writer.write(this.peer.getBytes());
        }
        if (this.psaType !== undefined && this.psaType !== null) {
            writer.tgWriteString(this.psaType);
        }
        if (this.psaMessage !== undefined && this.psaMessage !== null) {
            writer.tgWriteString(this.psaMessage);
        }
        writer.writeVector(this.pendingSuggestions, (item) => {
            writer.tgWriteString(item);
        });
        writer.writeVector(this.dismissedSuggestions, (item) => {
            writer.tgWriteString(item);
        });
        if (this.customPendingSuggestion !== undefined && this.customPendingSuggestion !== null) {
            writer.write(this.customPendingSuggestion.getBytes());
        }
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PromoData {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _proxy = true;
            args.proxy = _proxy;
        } else {
            args.proxy = false;
        }
        const _expires = reader.readInt();
        args.expires = _expires;
        if (args.flags & (1 << 3)) {
            const _peer = reader.tgReadObject();
            args.peer = _peer;
        } else {
            args.peer = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _psaType = reader.tgReadString();
            args.psaType = _psaType;
        } else {
            args.psaType = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _psaMessage = reader.tgReadString();
            args.psaMessage = _psaMessage;
        } else {
            args.psaMessage = undefined;
        }
        const _pendingSuggestions = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.pendingSuggestions = _pendingSuggestions;
        const _dismissedSuggestions = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.dismissedSuggestions = _dismissedSuggestions;
        if (args.flags & (1 << 4)) {
            const _customPendingSuggestion = reader.tgReadObject();
            args.customPendingSuggestion = _customPendingSuggestion;
        } else {
            args.customPendingSuggestion = undefined;
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
        return new PromoData(args);
    }
}