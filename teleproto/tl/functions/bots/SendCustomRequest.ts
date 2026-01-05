import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDataJSON } from "../../types/TypeDataJSON";

export class SendCustomRequest extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2854709741;
    static SUBCLASS_OF_ID = 2902676200;
    static className = "bots.SendCustomRequest";
    static classType = "request";

    customMethod!: string;
    params!: TypeDataJSON;

    constructor(args: { customMethod?: string, params?: TypeDataJSON } = {}) {
        super();
        this.customMethod = args.customMethod!;
        this.params = args.params!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2854709741, false);
        writer.tgWriteString(this.customMethod);
        writer.write(this.params.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDataJSON {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendCustomRequest {
        const args: any = {};
        const _customMethod = reader.tgReadString();
        args.customMethod = _customMethod;
        const _params = reader.tgReadObject();
        args.params = _params;
        return new SendCustomRequest(args);
    }
}