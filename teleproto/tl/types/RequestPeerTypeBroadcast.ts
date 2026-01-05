import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatAdminRights } from "./TypeChatAdminRights";

export class RequestPeerTypeBroadcast extends TLObject {
    static CONSTRUCTOR_ID = 865857388;
    static SUBCLASS_OF_ID = 3919636500;
    static className = "RequestPeerTypeBroadcast";
    static classType = "constructor";

    flags!: number;
    creator?: boolean;
    hasUsername?: boolean;
    userAdminRights?: TypeChatAdminRights;
    botAdminRights?: TypeChatAdminRights;

    constructor(args: { flags?: number, creator?: boolean, hasUsername?: boolean, userAdminRights?: TypeChatAdminRights, botAdminRights?: TypeChatAdminRights } = {}) {
        super();
        this.flags = args.flags!;
        this.creator = args.creator;
        this.hasUsername = args.hasUsername;
        this.userAdminRights = args.userAdminRights;
        this.botAdminRights = args.botAdminRights;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(865857388, false);
        let flags = 0;
        if (this.creator) { flags |= 1 << 0; }
        if (this.hasUsername !== undefined && this.hasUsername !== null) { flags |= 1 << 3; }
        if (this.userAdminRights !== undefined && this.userAdminRights !== null) { flags |= 1 << 1; }
        if (this.botAdminRights !== undefined && this.botAdminRights !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.creator !== undefined && this.creator !== null) {
        }
        if (this.hasUsername !== undefined && this.hasUsername !== null) {
            writer.tgWriteBool(this.hasUsername);
        }
        if (this.userAdminRights !== undefined && this.userAdminRights !== null) {
            writer.write(this.userAdminRights.getBytes());
        }
        if (this.botAdminRights !== undefined && this.botAdminRights !== null) {
            writer.write(this.botAdminRights.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RequestPeerTypeBroadcast {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _creator = true;
            args.creator = _creator;
        } else {
            args.creator = false;
        }
        if (args.flags & (1 << 3)) {
            const _hasUsername = reader.tgReadBool();
            args.hasUsername = _hasUsername;
        } else {
            args.hasUsername = undefined;
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
        return new RequestPeerTypeBroadcast(args);
    }
}