import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeUpdates } from "../../types/TypeUpdates";

export class StartScheduledGroupCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1451287362;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.StartScheduledGroupCall";
    static classType = "request";

    call!: TypeInputGroupCall;

    constructor(args: { call?: TypeInputGroupCall } = {}) {
        super();
        this.call = args.call!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1451287362, false);
        writer.write(this.call.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): StartScheduledGroupCall {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        return new StartScheduledGroupCall(args);
    }
}