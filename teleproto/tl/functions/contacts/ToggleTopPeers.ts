import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ToggleTopPeers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2232729050;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "contacts.ToggleTopPeers";
    static classType = "request";

    enabled!: boolean;

    constructor(args: { enabled?: boolean } = {}) {
        super();
        this.enabled = args.enabled!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2232729050, false);
        writer.tgWriteBool(this.enabled);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleTopPeers {
        const args: any = {};
        const _enabled = reader.tgReadBool();
        args.enabled = _enabled;
        return new ToggleTopPeers(args);
    }
}