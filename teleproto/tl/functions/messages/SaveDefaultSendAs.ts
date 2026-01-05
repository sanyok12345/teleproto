import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class SaveDefaultSendAs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3439189910;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SaveDefaultSendAs";
    static classType = "request";

    peer?: EntityLike;
    sendAs!: EntityLike;

    constructor(args: { peer?: EntityLike, sendAs?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
        this.sendAs = args.sendAs!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3439189910, false);
        writer.write((this.peer! as any).getBytes());
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
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _sendAs = reader.tgReadObject();
        args.sendAs = _sendAs;
        return new SaveDefaultSendAs(args);
    }
}