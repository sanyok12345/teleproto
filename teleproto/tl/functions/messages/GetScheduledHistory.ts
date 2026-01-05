import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMessages } from "../../types/messages/TypeMessages";

export class GetScheduledHistory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4111889931;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.GetScheduledHistory";
    static classType = "request";

    peer?: EntityLike;
    hash?: bigint;

    constructor(args: { peer?: EntityLike, hash?: bigint } = {}) {
        super();
        this.peer = args.peer;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4111889931, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetScheduledHistory {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetScheduledHistory(args);
    }
}