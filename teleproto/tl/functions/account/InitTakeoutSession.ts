import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeTakeout } from "../../types/account/TypeTakeout";

export class InitTakeoutSession extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2398350000;
    static SUBCLASS_OF_ID = 2218704517;
    static className = "account.InitTakeoutSession";
    static classType = "request";

    flags?: number;
    contacts?: boolean;
    messageUsers?: boolean;
    messageChats?: boolean;
    messageMegagroups?: boolean;
    messageChannels?: boolean;
    files?: boolean;
    fileMaxSize?: bigint;

    constructor(args: { flags?: number, contacts?: boolean, messageUsers?: boolean, messageChats?: boolean, messageMegagroups?: boolean, messageChannels?: boolean, files?: boolean, fileMaxSize?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.contacts = args.contacts;
        this.messageUsers = args.messageUsers;
        this.messageChats = args.messageChats;
        this.messageMegagroups = args.messageMegagroups;
        this.messageChannels = args.messageChannels;
        this.files = args.files;
        this.fileMaxSize = args.fileMaxSize;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2398350000, false);
        let flags = 0;
        if (this.contacts) { flags |= 1 << 0; }
        if (this.messageUsers) { flags |= 1 << 1; }
        if (this.messageChats) { flags |= 1 << 2; }
        if (this.messageMegagroups) { flags |= 1 << 3; }
        if (this.messageChannels) { flags |= 1 << 4; }
        if (this.files) { flags |= 1 << 5; }
        if (this.fileMaxSize !== undefined && this.fileMaxSize !== null) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        if (this.contacts !== undefined && this.contacts !== null) {
        }
        if (this.messageUsers !== undefined && this.messageUsers !== null) {
        }
        if (this.messageChats !== undefined && this.messageChats !== null) {
        }
        if (this.messageMegagroups !== undefined && this.messageMegagroups !== null) {
        }
        if (this.messageChannels !== undefined && this.messageChannels !== null) {
        }
        if (this.files !== undefined && this.files !== null) {
        }
        if (this.fileMaxSize !== undefined && this.fileMaxSize !== null) {
            writer.writeLargeInt(this.fileMaxSize, 64);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeTakeout {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InitTakeoutSession {
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
            const _messageUsers = true;
            args.messageUsers = _messageUsers;
        } else {
            args.messageUsers = false;
        }
        if (args.flags & (1 << 2)) {
            const _messageChats = true;
            args.messageChats = _messageChats;
        } else {
            args.messageChats = false;
        }
        if (args.flags & (1 << 3)) {
            const _messageMegagroups = true;
            args.messageMegagroups = _messageMegagroups;
        } else {
            args.messageMegagroups = false;
        }
        if (args.flags & (1 << 4)) {
            const _messageChannels = true;
            args.messageChannels = _messageChannels;
        } else {
            args.messageChannels = false;
        }
        if (args.flags & (1 << 5)) {
            const _files = true;
            args.files = _files;
        } else {
            args.files = false;
        }
        if (args.flags & (1 << 5)) {
            const _fileMaxSize = reader.readLargeInt(64);
            args.fileMaxSize = _fileMaxSize;
        } else {
            args.fileMaxSize = undefined;
        }
        return new InitTakeoutSession(args);
    }
}