import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputUser } from "./TypeInputUser";

export class InputBotAppShortName extends TLObject {
    static CONSTRUCTOR_ID = 2425095175;
    static SUBCLASS_OF_ID = 3059063121;
    static className = "InputBotAppShortName";
    static classType = "constructor";

    botId!: TypeInputUser;
    shortName!: string;

    constructor(args: { botId?: TypeInputUser, shortName?: string } = {}) {
        super();
        this.botId = args.botId!;
        this.shortName = args.shortName!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2425095175, false);
        writer.write(this.botId.getBytes());
        writer.tgWriteString(this.shortName);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBotAppShortName {
        const args: any = {};
        const _botId = reader.tgReadObject();
        args.botId = _botId;
        const _shortName = reader.tgReadString();
        args.shortName = _shortName;
        return new InputBotAppShortName(args);
    }
}