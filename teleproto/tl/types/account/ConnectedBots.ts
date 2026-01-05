import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeConnectedBot } from "../TypeConnectedBot";
import { TypeUser } from "../TypeUser";

export class ConnectedBots extends TLObject {
    static CONSTRUCTOR_ID = 400029819;
    static SUBCLASS_OF_ID = 3838506963;
    static className = "account.ConnectedBots";
    static classType = "constructor";

    connectedBots!: TypeConnectedBot[];
    users!: TypeUser[];

    constructor(args: { connectedBots?: TypeConnectedBot[], users?: TypeUser[] } = {}) {
        super();
        this.connectedBots = args.connectedBots!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(400029819, false);
        writer.writeVector(this.connectedBots, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ConnectedBots {
        const args: any = {};
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
        return new ConnectedBots(args);
    }
}