import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeConnectedBotStarRef } from "../TypeConnectedBotStarRef";
import { TypeUser } from "../TypeUser";

export class ConnectedStarRefBots extends TLObject {
    static CONSTRUCTOR_ID = 2564155933;
    static SUBCLASS_OF_ID = 593369703;
    static className = "payments.ConnectedStarRefBots";
    static classType = "constructor";

    count!: number;
    connectedBots!: TypeConnectedBotStarRef[];
    users!: TypeUser[];

    constructor(args: { count?: number, connectedBots?: TypeConnectedBotStarRef[], users?: TypeUser[] } = {}) {
        super();
        this.count = args.count!;
        this.connectedBots = args.connectedBots!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2564155933, false);
        writer.writeInt(this.count);
        writer.writeVector(this.connectedBots, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ConnectedStarRefBots {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _connectedBots = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.connectedBots = _connectedBots;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new ConnectedStarRefBots(args);
    }
}