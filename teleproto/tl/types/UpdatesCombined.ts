import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeUpdate } from "./TypeUpdate";
import { TypeUser } from "./TypeUser";
import { TypeChat } from "./TypeChat";

export class UpdatesCombined extends TLObject {
    static CONSTRUCTOR_ID = 1918567619;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "UpdatesCombined";
    static classType = "constructor";

    updates!: TypeUpdate[];
    users!: TypeUser[];
    chats!: TypeChat[];
    date!: number;
    seqStart!: number;
    seq!: number;

    constructor(args: { updates?: TypeUpdate[], users?: TypeUser[], chats?: TypeChat[], date?: number, seqStart?: number, seq?: number } = {}) {
        super();
        this.updates = args.updates!;
        this.users = args.users!;
        this.chats = args.chats!;
        this.date = args.date!;
        this.seqStart = args.seqStart!;
        this.seq = args.seq!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1918567619, false);
        writer.writeVector(this.updates, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.date);
        writer.writeInt(this.seqStart);
        writer.writeInt(this.seq);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatesCombined {
        const args: any = {};
        const _updates = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.updates = _updates;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        const _date = reader.readInt();
        args.date = _date;
        const _seqStart = reader.readInt();
        args.seqStart = _seqStart;
        const _seq = reader.readInt();
        args.seq = _seq;
        return new UpdatesCombined(args);
    }
}