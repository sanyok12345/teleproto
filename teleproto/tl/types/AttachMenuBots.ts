import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeAttachMenuBot } from "./TypeAttachMenuBot";
import { TypeUser } from "./TypeUser";

export class AttachMenuBots extends TLObject {
    static CONSTRUCTOR_ID = 1011024320;
    static SUBCLASS_OF_ID = 2217616346;
    static className = "AttachMenuBots";
    static classType = "constructor";

    hash!: bigint;
    bots!: TypeAttachMenuBot[];
    users!: TypeUser[];

    constructor(args: { hash?: bigint, bots?: TypeAttachMenuBot[], users?: TypeUser[] } = {}) {
        super();
        this.hash = args.hash!;
        this.bots = args.bots!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1011024320, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.bots, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AttachMenuBots {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _bots = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.bots = _bots;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new AttachMenuBots(args);
    }
}