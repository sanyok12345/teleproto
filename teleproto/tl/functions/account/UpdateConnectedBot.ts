import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeBusinessBotRights } from "../../types/TypeBusinessBotRights";
import { EntityLike } from "../../types/../../define";
import { TypeInputBusinessBotRecipients } from "../../types/TypeInputBusinessBotRecipients";
import { TypeUpdates } from "../../types/TypeUpdates";

export class UpdateConnectedBot extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1721797758;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "account.UpdateConnectedBot";
    static classType = "request";

    flags?: number;
    deleted?: boolean;
    rights?: TypeBusinessBotRights;
    bot?: EntityLike;
    recipients!: TypeInputBusinessBotRecipients;

    constructor(args: { flags?: number, deleted?: boolean, rights?: TypeBusinessBotRights, bot?: EntityLike, recipients?: TypeInputBusinessBotRecipients } = {}) {
        super();
        this.flags = args.flags;
        this.deleted = args.deleted;
        this.rights = args.rights;
        this.bot = args.bot;
        this.recipients = args.recipients!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1721797758, false);
        let flags = 0;
        if (this.deleted) { flags |= 1 << 1; }
        if (this.rights !== undefined && this.rights !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.deleted !== undefined && this.deleted !== null) {
        }
        if (this.rights !== undefined && this.rights !== null) {
            writer.write(this.rights.getBytes());
        }
        writer.write((this.bot! as any).getBytes());
        writer.write(this.recipients.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateConnectedBot {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _deleted = true;
            args.deleted = _deleted;
        } else {
            args.deleted = false;
        }
        if (args.flags & (1 << 0)) {
            const _rights = reader.tgReadObject();
            args.rights = _rights;
        } else {
            args.rights = undefined;
        }
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _recipients = reader.tgReadObject();
        args.recipients = _recipients;
        return new UpdateConnectedBot(args);
    }
}