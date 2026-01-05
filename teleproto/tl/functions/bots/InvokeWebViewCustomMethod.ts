import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeDataJSON } from "../../types/TypeDataJSON";

export class InvokeWebViewCustomMethod extends MTProtoRequest {
    static CONSTRUCTOR_ID = 142591463;
    static SUBCLASS_OF_ID = 2902676200;
    static className = "bots.InvokeWebViewCustomMethod";
    static classType = "request";

    bot?: EntityLike;
    customMethod!: string;
    params!: TypeDataJSON;

    constructor(args: { bot?: EntityLike, customMethod?: string, params?: TypeDataJSON } = {}) {
        super();
        this.bot = args.bot;
        this.customMethod = args.customMethod!;
        this.params = args.params!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(142591463, false);
        writer.write((this.bot! as any).getBytes());
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

    static fromReader(reader: BinaryReader): InvokeWebViewCustomMethod {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _customMethod = reader.tgReadString();
        args.customMethod = _customMethod;
        const _params = reader.tgReadObject();
        args.params = _params;
        return new InvokeWebViewCustomMethod(args);
    }
}