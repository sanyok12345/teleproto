import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeExportedAuthorization } from "../../types/auth/TypeExportedAuthorization";

export class ExportAuthorization extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3854565325;
    static SUBCLASS_OF_ID = 1607593041;
    static className = "auth.ExportAuthorization";
    static classType = "request";

    dcId!: number;

    constructor(args: { dcId?: number } = {}) {
        super();
        this.dcId = args.dcId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3854565325, false);
        writer.writeInt(this.dcId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedAuthorization {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ExportAuthorization {
        const args: any = {};
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        return new ExportAuthorization(args);
    }
}