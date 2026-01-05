import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeAffectedMessages } from "../../types/messages/TypeAffectedMessages";

export class ReadHistory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 238054714;
    static SUBCLASS_OF_ID = 3469983854;
    static className = "messages.ReadHistory";
    static classType = "request";

    peer?: EntityLike;
    maxId?: number;

    constructor(args: { peer?: EntityLike, maxId?: number } = {}) {
        super();
        this.peer = args.peer;
        this.maxId = args.maxId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(238054714, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.maxId!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAffectedMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReadHistory {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        return new ReadHistory(args);
    }
}