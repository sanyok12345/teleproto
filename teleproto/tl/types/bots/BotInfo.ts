import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class BotInfo extends TLObject {
    static CONSTRUCTOR_ID = 3903288752;
    static SUBCLASS_OF_ID = 3397067317;
    static className = "bots.BotInfo";
    static classType = "constructor";

    name!: string;
    about!: string;
    description!: string;

    constructor(args: { name?: string, about?: string, description?: string } = {}) {
        super();
        this.name = args.name!;
        this.about = args.about!;
        this.description = args.description!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3903288752, false);
        writer.tgWriteString(this.name);
        writer.tgWriteString(this.about);
        writer.tgWriteString(this.description);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotInfo {
        const args: any = {};
        const _name = reader.tgReadString();
        args.name = _name;
        const _about = reader.tgReadString();
        args.about = _about;
        const _description = reader.tgReadString();
        args.description = _description;
        return new BotInfo(args);
    }
}