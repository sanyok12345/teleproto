import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeUpdates } from "../../types/TypeUpdates";

export class LeaveGroupCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1342404601;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.LeaveGroupCall";
    static classType = "request";

    call!: TypeInputGroupCall;
    source!: number;

    constructor(args: { call?: TypeInputGroupCall, source?: number } = {}) {
        super();
        this.call = args.call!;
        this.source = args.source!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1342404601, false);
        writer.write(this.call.getBytes());
        writer.writeInt(this.source);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): LeaveGroupCall {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _source = reader.readInt();
        args.source = _source;
        return new LeaveGroupCall(args);
    }
}