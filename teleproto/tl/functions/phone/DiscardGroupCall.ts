import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeUpdates } from "../../types/TypeUpdates";

export class DiscardGroupCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2054648117;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.DiscardGroupCall";
    static classType = "request";

    call!: TypeInputGroupCall;

    constructor(args: { call?: TypeInputGroupCall } = {}) {
        super();
        this.call = args.call!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2054648117, false);
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

    static fromReader(reader: BinaryReader): DiscardGroupCall {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        return new DiscardGroupCall(args);
    }
}