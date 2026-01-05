import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ViewSponsoredMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 647902787;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ViewSponsoredMessage";
    static classType = "request";

    randomId!: Buffer;

    constructor(args: { randomId?: Buffer } = {}) {
        super();
        this.randomId = args.randomId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(647902787, false);
        writer.tgWriteBytes(this.randomId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ViewSponsoredMessage {
        const args: any = {};
        const _randomId = reader.tgReadBytes();
        args.randomId = _randomId;
        return new ViewSponsoredMessage(args);
    }
}