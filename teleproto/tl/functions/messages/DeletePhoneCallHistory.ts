import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAffectedFoundMessages } from "../../types/messages/TypeAffectedFoundMessages";

export class DeletePhoneCallHistory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4190888969;
    static SUBCLASS_OF_ID = 4162282798;
    static className = "messages.DeletePhoneCallHistory";
    static classType = "request";

    flags?: number;
    revoke?: boolean;

    constructor(args: { flags?: number, revoke?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.revoke = args.revoke;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4190888969, false);
        let flags = 0;
        if (this.revoke) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.revoke !== undefined && this.revoke !== null) {
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAffectedFoundMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeletePhoneCallHistory {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _revoke = true;
            args.revoke = _revoke;
        } else {
            args.revoke = false;
        }
        return new DeletePhoneCallHistory(args);
    }
}