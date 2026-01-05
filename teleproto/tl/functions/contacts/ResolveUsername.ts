import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeResolvedPeer } from "../../types/contacts/TypeResolvedPeer";

export class ResolveUsername extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1918565308;
    static SUBCLASS_OF_ID = 4033196968;
    static className = "contacts.ResolveUsername";
    static classType = "request";

    flags?: number;
    username!: string;
    referer?: string;

    constructor(args: { flags?: number, username?: string, referer?: string } = {}) {
        super();
        this.flags = args.flags;
        this.username = args.username!;
        this.referer = args.referer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1918565308, false);
        let flags = 0;
        if (this.referer !== undefined && this.referer !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.username);
        if (this.referer !== undefined && this.referer !== null) {
            writer.tgWriteString(this.referer);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeResolvedPeer {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ResolveUsername {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _username = reader.tgReadString();
        args.username = _username;
        if (args.flags & (1 << 0)) {
            const _referer = reader.tgReadString();
            args.referer = _referer;
        } else {
            args.referer = undefined;
        }
        return new ResolveUsername(args);
    }
}