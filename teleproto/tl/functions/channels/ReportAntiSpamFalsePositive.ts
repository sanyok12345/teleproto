import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";

export class ReportAntiSpamFalsePositive extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2823857811;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "channels.ReportAntiSpamFalsePositive";
    static classType = "request";

    channel?: EntityLike;
    msgId?: MessageIDLike;

    constructor(args: { channel?: EntityLike, msgId?: MessageIDLike } = {}) {
        super();
        this.channel = args.channel;
        this.msgId = args.msgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2823857811, false);
        writer.write((this.channel! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReportAntiSpamFalsePositive {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new ReportAntiSpamFalsePositive(args);
    }
}