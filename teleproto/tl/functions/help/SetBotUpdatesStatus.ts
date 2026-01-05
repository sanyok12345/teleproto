import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class SetBotUpdatesStatus extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3961704397;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "help.SetBotUpdatesStatus";
    static classType = "request";

    pendingUpdatesCount!: number;
    message!: string;

    constructor(args: { pendingUpdatesCount?: number, message?: string } = {}) {
        super();
        this.pendingUpdatesCount = args.pendingUpdatesCount!;
        this.message = args.message!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3961704397, false);
        writer.writeInt(this.pendingUpdatesCount);
        writer.tgWriteString(this.message);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetBotUpdatesStatus {
        const args: any = {};
        const _pendingUpdatesCount = reader.readInt();
        args.pendingUpdatesCount = _pendingUpdatesCount;
        const _message = reader.tgReadString();
        args.message = _message;
        return new SetBotUpdatesStatus(args);
    }
}