import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePrivacyRule } from "../TypePrivacyRule";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class PrivacyRules extends TLObject {
    static CONSTRUCTOR_ID = 1352683077;
    static SUBCLASS_OF_ID = 3042622082;
    static className = "account.PrivacyRules";
    static classType = "constructor";

    rules!: TypePrivacyRule[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { rules?: TypePrivacyRule[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.rules = args.rules!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1352683077, false);
        writer.writeVector(this.rules, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyRules {
        const args: any = {};
        const _rules = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.rules = _rules;
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new PrivacyRules(args);
    }
}