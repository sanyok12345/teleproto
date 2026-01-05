import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { EntityLike } from "../../types/../../define";

export class SaveDefaultSendAs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1097313745;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "phone.SaveDefaultSendAs";
    static classType = "request";

    call!: TypeInputGroupCall;
    sendAs!: EntityLike;

    constructor(args: { call?: TypeInputGroupCall, sendAs?: EntityLike } = {}) {
        super();
        this.call = args.call!;
        this.sendAs = args.sendAs!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1097313745, false);
        writer.write(this.call.getBytes());
        writer.write((this.sendAs as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveDefaultSendAs {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _sendAs = reader.tgReadObject();
        args.sendAs = _sendAs;
        return new SaveDefaultSendAs(args);
    }
}