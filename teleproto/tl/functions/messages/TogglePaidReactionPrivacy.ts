import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypePaidReactionPrivacy } from "../../types/TypePaidReactionPrivacy";

export class TogglePaidReactionPrivacy extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1129874869;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.TogglePaidReactionPrivacy";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike;
    private!: TypePaidReactionPrivacy;

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike, private?: TypePaidReactionPrivacy } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.private = args.private!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1129874869, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        writer.write(this.private.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): TogglePaidReactionPrivacy {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _private = reader.tgReadObject();
        args.private = _private;
        return new TogglePaidReactionPrivacy(args);
    }
}