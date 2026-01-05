import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class UpdateStatus extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1713919532;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.UpdateStatus";
    static classType = "request";

    offline!: boolean;

    constructor(args: { offline?: boolean } = {}) {
        super();
        this.offline = args.offline!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1713919532, false);
        writer.tgWriteBool(this.offline);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateStatus {
        const args: any = {};
        const _offline = reader.tgReadBool();
        args.offline = _offline;
        return new UpdateStatus(args);
    }
}