import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeChatAdminRights } from "../../types/TypeChatAdminRights";

export class SetBotGroupDefaultAdminRights extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2455685610;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.SetBotGroupDefaultAdminRights";
    static classType = "request";

    adminRights!: TypeChatAdminRights;

    constructor(args: { adminRights?: TypeChatAdminRights } = {}) {
        super();
        this.adminRights = args.adminRights!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2455685610, false);
        writer.write(this.adminRights.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetBotGroupDefaultAdminRights {
        const args: any = {};
        const _adminRights = reader.tgReadObject();
        args.adminRights = _adminRights;
        return new SetBotGroupDefaultAdminRights(args);
    }
}