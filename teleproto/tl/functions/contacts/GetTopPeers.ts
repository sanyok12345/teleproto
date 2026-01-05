import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeTopPeers } from "../../types/contacts/TypeTopPeers";

export class GetTopPeers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2536798390;
    static SUBCLASS_OF_ID = 2666052488;
    static className = "contacts.GetTopPeers";
    static classType = "request";

    flags?: number;
    correspondents?: boolean;
    botsPm?: boolean;
    botsInline?: boolean;
    phoneCalls?: boolean;
    forwardUsers?: boolean;
    forwardChats?: boolean;
    groups?: boolean;
    channels?: boolean;
    botsApp?: boolean;
    offset!: number;
    limit!: number;
    hash?: bigint;

    constructor(args: { flags?: number, correspondents?: boolean, botsPm?: boolean, botsInline?: boolean, phoneCalls?: boolean, forwardUsers?: boolean, forwardChats?: boolean, groups?: boolean, channels?: boolean, botsApp?: boolean, offset?: number, limit?: number, hash?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.correspondents = args.correspondents;
        this.botsPm = args.botsPm;
        this.botsInline = args.botsInline;
        this.phoneCalls = args.phoneCalls;
        this.forwardUsers = args.forwardUsers;
        this.forwardChats = args.forwardChats;
        this.groups = args.groups;
        this.channels = args.channels;
        this.botsApp = args.botsApp;
        this.offset = args.offset!;
        this.limit = args.limit!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2536798390, false);
        let flags = 0;
        if (this.correspondents) { flags |= 1 << 0; }
        if (this.botsPm) { flags |= 1 << 1; }
        if (this.botsInline) { flags |= 1 << 2; }
        if (this.phoneCalls) { flags |= 1 << 3; }
        if (this.forwardUsers) { flags |= 1 << 4; }
        if (this.forwardChats) { flags |= 1 << 5; }
        if (this.groups) { flags |= 1 << 10; }
        if (this.channels) { flags |= 1 << 15; }
        if (this.botsApp) { flags |= 1 << 16; }
        writer.writeInt(flags, false);
        if (this.correspondents !== undefined && this.correspondents !== null) {
        }
        if (this.botsPm !== undefined && this.botsPm !== null) {
        }
        if (this.botsInline !== undefined && this.botsInline !== null) {
        }
        if (this.phoneCalls !== undefined && this.phoneCalls !== null) {
        }
        if (this.forwardUsers !== undefined && this.forwardUsers !== null) {
        }
        if (this.forwardChats !== undefined && this.forwardChats !== null) {
        }
        if (this.groups !== undefined && this.groups !== null) {
        }
        if (this.channels !== undefined && this.channels !== null) {
        }
        if (this.botsApp !== undefined && this.botsApp !== null) {
        }
        writer.writeInt(this.offset);
        writer.writeInt(this.limit);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeTopPeers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetTopPeers {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _correspondents = true;
            args.correspondents = _correspondents;
        } else {
            args.correspondents = false;
        }
        if (args.flags & (1 << 1)) {
            const _botsPm = true;
            args.botsPm = _botsPm;
        } else {
            args.botsPm = false;
        }
        if (args.flags & (1 << 2)) {
            const _botsInline = true;
            args.botsInline = _botsInline;
        } else {
            args.botsInline = false;
        }
        if (args.flags & (1 << 3)) {
            const _phoneCalls = true;
            args.phoneCalls = _phoneCalls;
        } else {
            args.phoneCalls = false;
        }
        if (args.flags & (1 << 4)) {
            const _forwardUsers = true;
            args.forwardUsers = _forwardUsers;
        } else {
            args.forwardUsers = false;
        }
        if (args.flags & (1 << 5)) {
            const _forwardChats = true;
            args.forwardChats = _forwardChats;
        } else {
            args.forwardChats = false;
        }
        if (args.flags & (1 << 10)) {
            const _groups = true;
            args.groups = _groups;
        } else {
            args.groups = false;
        }
        if (args.flags & (1 << 15)) {
            const _channels = true;
            args.channels = _channels;
        } else {
            args.channels = false;
        }
        if (args.flags & (1 << 16)) {
            const _botsApp = true;
            args.botsApp = _botsApp;
        } else {
            args.botsApp = false;
        }
        const _offset = reader.readInt();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetTopPeers(args);
    }
}