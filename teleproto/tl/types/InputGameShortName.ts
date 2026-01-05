import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputUser } from "./TypeInputUser";

export class InputGameShortName extends TLObject {
    static CONSTRUCTOR_ID = 3274827786;
    static SUBCLASS_OF_ID = 1221679235;
    static className = "InputGameShortName";
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
        writer.writeInt(3274827786, false);
        writer.write(this.botId.getBytes());
        writer.tgWriteString(this.shortName);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputGameShortName {
        const args: any = {};
        const _botId = reader.tgReadObject();
        args.botId = _botId;
        const _shortName = reader.tgReadString();
        args.shortName = _shortName;
        return new InputGameShortName(args);
    }
}