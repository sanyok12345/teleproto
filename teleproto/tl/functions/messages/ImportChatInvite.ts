import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ImportChatInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1817183516;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.ImportChatInvite";
    static classType = "request";

    hash?: string;

    constructor(args: { hash?: string } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1817183516, false);
        writer.tgWriteString(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ImportChatInvite {
        const args: any = {};
        const _hash = reader.tgReadString();
        args.hash = _hash;
        return new ImportChatInvite(args);
    }
}