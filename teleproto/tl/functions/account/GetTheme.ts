import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputTheme } from "../../types/TypeInputTheme";
import { TypeTheme } from "../../types/TypeTheme";

export class GetTheme extends MTProtoRequest {
    static CONSTRUCTOR_ID = 978872812;
    static SUBCLASS_OF_ID = 1454688268;
    static className = "account.GetTheme";
    static classType = "request";

    format!: string;
    theme!: TypeInputTheme;

    constructor(args: { format?: string, theme?: TypeInputTheme } = {}) {
        super();
        this.format = args.format!;
        this.theme = args.theme!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(978872812, false);
        writer.tgWriteString(this.format);
        writer.write(this.theme.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeTheme {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetTheme {
        const args: any = {};
        const _format = reader.tgReadString();
        args.format = _format;
        const _theme = reader.tgReadObject();
        args.theme = _theme;
        return new GetTheme(args);
    }
}