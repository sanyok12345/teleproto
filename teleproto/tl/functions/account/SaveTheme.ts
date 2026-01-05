import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputTheme } from "../../types/TypeInputTheme";

export class SaveTheme extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4065792108;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.SaveTheme";
    static classType = "request";

    theme!: TypeInputTheme;
    unsave!: boolean;

    constructor(args: { theme?: TypeInputTheme, unsave?: boolean } = {}) {
        super();
        this.theme = args.theme!;
        this.unsave = args.unsave!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4065792108, false);
        writer.write(this.theme.getBytes());
        writer.tgWriteBool(this.unsave);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveTheme {
        const args: any = {};
        const _theme = reader.tgReadObject();
        args.theme = _theme;
        const _unsave = reader.tgReadBool();
        args.unsave = _unsave;
        return new SaveTheme(args);
    }
}