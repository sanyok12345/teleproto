import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGroupCall } from "./TypeInputGroupCall";

export class MessageActionInviteToGroupCall extends TLObject {
    static CONSTRUCTOR_ID = 1345295095;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionInviteToGroupCall";
    static classType = "constructor";

    call!: TypeInputGroupCall;
    users!: bigint[];

    constructor(args: { call?: TypeInputGroupCall, users?: bigint[] } = {}) {
        super();
        this.call = args.call!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1345295095, false);
        writer.write(this.call.getBytes());
        writer.writeVector(this.users, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionInviteToGroupCall {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _users = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.users = _users;
        return new MessageActionInviteToGroupCall(args);
    }
}