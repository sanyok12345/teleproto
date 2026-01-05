import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeBotCommandScope } from "../../types/TypeBotCommandScope";

export class ResetBotCommands extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1032708345;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.ResetBotCommands";
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
        writer.writeInt(1032708345, false);
        writer.write(this.scope.getBytes());
        writer.tgWriteString(this.langCode!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ResetBotCommands {
        const args: any = {};
        const _scope = reader.tgReadObject();
        args.scope = _scope;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        return new ResetBotCommands(args);
    }
}