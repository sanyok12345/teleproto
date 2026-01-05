import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessageEntity } from "../TypeMessageEntity";

export class UserInfo extends TLObject {
    static CONSTRUCTOR_ID = 32192344;
    static SUBCLASS_OF_ID = 1548998616;
    static className = "help.UserInfo";
    static classType = "constructor";

    message!: string;
    entities!: TypeMessageEntity[];
    author!: string;
    date!: number;

    constructor(args: { message?: string, entities?: TypeMessageEntity[], author?: string, date?: number } = {}) {
        super();
        this.message = args.message!;
        this.entities = args.entities!;
        this.author = args.author!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(32192344, false);
        writer.tgWriteString(this.message);
        writer.writeVector(this.entities, (item) => {
            writer.write(item.getBytes());
        });
        writer.tgWriteString(this.author);
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UserInfo {
        const args: any = {};
        const _message = reader.tgReadString();
        args.message = _message;
        const _entities = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.entities = _entities;
        const _author = reader.tgReadString();
        args.author = _author;
        const _date = reader.readInt();
        args.date = _date;
        return new UserInfo(args);
    }
}