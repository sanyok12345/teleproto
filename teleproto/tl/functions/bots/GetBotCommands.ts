import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeBotCommandScope } from "../../types/TypeBotCommandScope";
import { TypeBotCommand } from "../../types/TypeBotCommand";

export class GetBotCommands extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3813412310;
    static SUBCLASS_OF_ID = 4209579305;
    static className = "bots.GetBotCommands";
    static classType = "request";

    scope!: TypeBotCommandScope;
    langCode?: string;

    constructor(args: { scope?: TypeBotCommandScope, langCode?: string } = {}) {
        super();
        this.scope = args.scope!;
        this.langCode = args.langCode;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3813412310, false);
        writer.write(this.scope.getBytes());
        writer.tgWriteString(this.langCode!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBotCommand[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBotCommands {
        const args: any = {};
        const _scope = reader.tgReadObject();
        args.scope = _scope;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        return new GetBotCommands(args);
    }
}