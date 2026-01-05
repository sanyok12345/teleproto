import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";
import { TypeInputUser } from "./TypeInputUser";

export class BotCommandScopePeerUser extends TLObject {
    static CONSTRUCTOR_ID = 169026035;
    static SUBCLASS_OF_ID = 1269783824;
    static className = "BotCommandScopePeerUser";
    static classType = "constructor";

    peer!: TypeInputPeer;
    userId!: TypeInputUser;

    constructor(args: { peer?: TypeInputPeer, userId?: TypeInputUser } = {}) {
        super();
        this.peer = args.peer!;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(169026035, false);
        writer.write(this.peer.getBytes());
        writer.write(this.userId.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotCommandScopePeerUser {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new BotCommandScopePeerUser(args);
    }
}