import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAffectedMessages } from "../../types/messages/TypeAffectedMessages";

export class DeleteMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3851326930;
    static SUBCLASS_OF_ID = 3469983854;
    static className = "messages.DeleteMessages";
    static classType = "request";

    flags?: number;
    revoke?: boolean;
    id?: number[];

    constructor(args: { flags?: number, revoke?: boolean, id?: number[] } = {}) {
        super();
        this.flags = args.flags;
        this.revoke = args.revoke;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3851326930, false);
        let flags = 0;
        if (this.revoke) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.revoke !== undefined && this.revoke !== null) {
        }
        writer.writeVector(this.id!, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAffectedMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteMessages {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _revoke = true;
            args.revoke = _revoke;
        } else {
            args.revoke = false;
        }
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        return new DeleteMessages(args);
    }
}