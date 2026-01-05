import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeBotCommandScope } from "../../types/TypeBotCommandScope";
import { TypeBotCommand } from "../../types/TypeBotCommand";

export class SetBotCommands extends MTProtoRequest {
    static CONSTRUCTOR_ID = 85399130;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.SetBotCommands";
    static classType = "request";

    scope!: TypeBotCommandScope;
    langCode?: string;
    commands!: TypeBotCommand[];

    constructor(args: { scope?: TypeBotCommandScope, langCode?: string, commands?: TypeBotCommand[] } = {}) {
        super();
        this.scope = args.scope!;
        this.langCode = args.langCode;
        this.commands = args.commands!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(85399130, false);
        writer.write(this.scope.getBytes());
        writer.tgWriteString(this.langCode!);
        writer.writeVector(this.commands, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetBotCommands {
        const args: any = {};
        const _scope = reader.tgReadObject();
        args.scope = _scope;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        const _commands = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.commands = _commands;
        return new SetBotCommands(args);
    }
}