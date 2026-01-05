import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeHistoryImportParsed } from "../../types/messages/TypeHistoryImportParsed";

export class CheckHistoryImport extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1140726259;
    static SUBCLASS_OF_ID = 1538421259;
    static className = "messages.CheckHistoryImport";
    static classType = "request";

    importHead!: string;

    constructor(args: { importHead?: string } = {}) {
        super();
        this.importHead = args.importHead!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1140726259, false);
        writer.tgWriteString(this.importHead);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeHistoryImportParsed {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckHistoryImport {
        const args: any = {};
        const _importHead = reader.tgReadString();
        args.importHead = _importHead;
        return new CheckHistoryImport(args);
    }
}