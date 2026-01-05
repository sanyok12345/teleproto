import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeAttachMenuBot } from "./TypeAttachMenuBot";
import { TypeUser } from "./TypeUser";

export class AttachMenuBotsBot extends TLObject {
    static CONSTRUCTOR_ID = 2478794367;
    static SUBCLASS_OF_ID = 3677587517;
    static className = "AttachMenuBotsBot";
    static classType = "constructor";

    bot!: TypeAttachMenuBot;
    users!: TypeUser[];

    constructor(args: { bot?: TypeAttachMenuBot, users?: TypeUser[] } = {}) {
        super();
        this.bot = args.bot!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2478794367, false);
        writer.write(this.bot.getBytes());
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AttachMenuBotsBot {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new AttachMenuBotsBot(args);
    }
}