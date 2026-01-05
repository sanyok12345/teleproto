import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class InviteToGroupCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2067345760;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.InviteToGroupCall";
    static classType = "request";

    call!: TypeInputGroupCall;
    users!: EntityLike[];

    constructor(args: { call?: TypeInputGroupCall, users?: EntityLike[] } = {}) {
        super();
        this.call = args.call!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2067345760, false);
        writer.write(this.call.getBytes());
        writer.writeVector(this.users, (item) => {
            writer.write((item as any).getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InviteToGroupCall {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new InviteToGroupCall(args);
    }
}