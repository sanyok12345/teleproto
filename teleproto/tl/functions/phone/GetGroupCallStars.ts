import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeGroupCallStars } from "../../types/phone/TypeGroupCallStars";

export class GetGroupCallStars extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1868784386;
    static SUBCLASS_OF_ID = 3024584730;
    static className = "phone.GetGroupCallStars";
    static classType = "request";

    call!: TypeInputGroupCall;

    constructor(args: { call?: TypeInputGroupCall } = {}) {
        super();
        this.call = args.call!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1868784386, false);
        writer.write(this.call.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeGroupCallStars {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetGroupCallStars {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        return new GetGroupCallStars(args);
    }
}