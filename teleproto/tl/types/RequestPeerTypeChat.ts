import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatAdminRights } from "./TypeChatAdminRights";

export class RequestPeerTypeChat extends TLObject {
    static CONSTRUCTOR_ID = 3387977243;
    static SUBCLASS_OF_ID = 3919636500;
    static className = "RequestPeerTypeChat";
    static classType = "constructor";

    flags!: number;
    creator?: boolean;
    botParticipant?: boolean;
    hasUsername?: boolean;
    forum?: boolean;
    userAdminRights?: TypeChatAdminRights;
    botAdminRights?: TypeChatAdminRights;

    constructor(args: { flags?: number, creator?: boolean, botParticipant?: boolean, hasUsername?: boolean, forum?: boolean, userAdminRights?: TypeChatAdminRights, botAdminRights?: TypeChatAdminRights } = {}) {
        super();
        this.flags = args.flags!;
        this.creator = args.creator;
        this.botParticipant = args.botParticipant;
        this.hasUsername = args.hasUsername;
        this.forum = args.forum;
        this.userAdminRights = args.userAdminRights;
        this.botAdminRights = args.botAdminRights;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3387977243, false);
        let flags = 0;
        if (this.creator) { flags |= 1 << 0; }
        if (this.botParticipant) { flags |= 1 << 5; }
        if (this.hasUsername !== undefined && this.hasUsername !== null) { flags |= 1 << 3; }
        if (this.forum !== undefined && this.forum !== null) { flags |= 1 << 4; }
        if (this.userAdminRights !== undefined && this.userAdminRights !== null) { flags |= 1 << 1; }
        if (this.botAdminRights !== undefined && this.botAdminRights !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.creator !== undefined && this.creator !== null) {
        }
        if (this.botParticipant !== undefined && this.botParticipant !== null) {
        }
        if (this.hasUsername !== undefined && this.hasUsername !== null) {
            writer.tgWriteBool(this.hasUsername);
        }
        if (this.forum !== undefined && this.forum !== null) {
            writer.tgWriteBool(this.forum);
        }
        if (this.userAdminRights !== undefined && this.userAdminRights !== null) {
            writer.write(this.userAdminRights.getBytes());
        }
        if (this.botAdminRights !== undefined && this.botAdminRights !== null) {
            writer.write(this.botAdminRights.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RequestPeerTypeChat {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _creator = true;
            args.creator = _creator;
        } else {
            args.creator = false;
        }
        if (args.flags & (1 << 5)) {
            const _botParticipant = true;
            args.botParticipant = _botParticipant;
        } else {
            args.botParticipant = false;
        }
        if (args.flags & (1 << 3)) {
            const _hasUsername = reader.tgReadBool();
            args.hasUsername = _hasUsername;
        } else {
            args.hasUsername = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _forum = reader.tgReadBool();
            args.forum = _forum;
        } else {
            args.forum = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _userAdminRights = reader.tgReadObject();
            args.userAdminRights = _userAdminRights;
        } else {
            args.userAdminRights = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _botAdminRights = reader.tgReadObject();
            args.botAdminRights = _botAdminRights;
        } else {
            args.botAdminRights = undefined;
        }
        return new RequestPeerTypeChat(args);
    }
}