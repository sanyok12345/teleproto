import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SetHistoryTTL extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3087949796;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SetHistoryTTL";
    static classType = "request";

    peer?: EntityLike;
    period!: number;

    constructor(args: { peer?: EntityLike, period?: number } = {}) {
        super();
        this.peer = args.peer;
        this.period = args.period!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3087949796, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.period);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetHistoryTTL {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _period = reader.readInt();
        args.period = _period;
        return new SetHistoryTTL(args);
    }
}