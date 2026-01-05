import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class CheckShortName extends MTProtoRequest {
    static CONSTRUCTOR_ID = 676017721;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "stickers.CheckShortName";
    static classType = "request";

    shortName!: string;

    constructor(args: { shortName?: string } = {}) {
        super();
        this.shortName = args.shortName!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(676017721, false);
        writer.tgWriteString(this.shortName);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckShortName {
        const args: any = {};
        const _shortName = reader.tgReadString();
        args.shortName = _shortName;
        return new CheckShortName(args);
    }
}