import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSponsoredMessageReportResult } from "../../types/channels/TypeSponsoredMessageReportResult";

export class ReportSponsoredMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 315355332;
    static SUBCLASS_OF_ID = 639834146;
    static className = "messages.ReportSponsoredMessage";
    static classType = "request";

    randomId!: Buffer;
    option!: Buffer;

    constructor(args: { randomId?: Buffer, option?: Buffer } = {}) {
        super();
        this.randomId = args.randomId!;
        this.option = args.option!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(315355332, false);
        writer.tgWriteBytes(this.randomId);
        writer.tgWriteBytes(this.option);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSponsoredMessageReportResult {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReportSponsoredMessage {
        const args: any = {};
        const _randomId = reader.tgReadBytes();
        args.randomId = _randomId;
        const _option = reader.tgReadBytes();
        args.option = _option;
        return new ReportSponsoredMessage(args);
    }
}