import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class SetDefaultHistoryTTL extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2662667333;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SetDefaultHistoryTTL";
    static classType = "request";

    period!: number;

    constructor(args: { period?: number } = {}) {
        super();
        this.period = args.period!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2662667333, false);
        writer.writeInt(this.period);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetDefaultHistoryTTL {
        const args: any = {};
        const _period = reader.readInt();
        args.period = _period;
        return new SetDefaultHistoryTTL(args);
    }
}