import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { MessageIDLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class DeclineConferenceCallInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1011325297;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.DeclineConferenceCallInvite";
    static classType = "request";

    msgId?: MessageIDLike;

    constructor(args: { msgId?: MessageIDLike } = {}) {
        super();
        this.msgId = args.msgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1011325297, false);
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeclineConferenceCallInvite {
        const args: any = {};
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new DeclineConferenceCallInvite(args);
    }
}