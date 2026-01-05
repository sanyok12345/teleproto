import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeDataJSON } from "../../types/TypeDataJSON";
import { TypeUpdates } from "../../types/TypeUpdates";

export class JoinGroupCallPresentation extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3421137860;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.JoinGroupCallPresentation";
    static classType = "request";

    call!: TypeInputGroupCall;
    params!: TypeDataJSON;

    constructor(args: { call?: TypeInputGroupCall, params?: TypeDataJSON } = {}) {
        super();
        this.call = args.call!;
        this.params = args.params!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3421137860, false);
        writer.write(this.call.getBytes());
        writer.write(this.params.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): JoinGroupCallPresentation {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _params = reader.tgReadObject();
        args.params = _params;
        return new JoinGroupCallPresentation(args);
    }
}