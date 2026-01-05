import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputBotInlineResult } from "../../types/TypeInputBotInlineResult";
import { TypeWebViewMessageSent } from "../../types/TypeWebViewMessageSent";

export class SendWebViewResultMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 172168437;
    static SUBCLASS_OF_ID = 1977914130;
    static className = "messages.SendWebViewResultMessage";
    static classType = "request";

    botQueryId!: string;
    result!: TypeInputBotInlineResult;

    constructor(args: { botQueryId?: string, result?: TypeInputBotInlineResult } = {}) {
        super();
        this.botQueryId = args.botQueryId!;
        this.result = args.result!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(172168437, false);
        writer.tgWriteString(this.botQueryId);
        writer.write(this.result.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeWebViewMessageSent {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendWebViewResultMessage {
        const args: any = {};
        const _botQueryId = reader.tgReadString();
        args.botQueryId = _botQueryId;
        const _result = reader.tgReadObject();
        args.result = _result;
        return new SendWebViewResultMessage(args);
    }
}