import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeGroupCallStreamChannels } from "../../types/phone/TypeGroupCallStreamChannels";

export class GetGroupCallStreamChannels extends MTProtoRequest {
    static CONSTRUCTOR_ID = 447879488;
    static SUBCLASS_OF_ID = 2438448612;
    static className = "phone.GetGroupCallStreamChannels";
    static classType = "request";

    call!: TypeInputGroupCall;

    constructor(args: { call?: TypeInputGroupCall } = {}) {
        super();
        this.call = args.call!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(447879488, false);
        writer.write(this.call.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeGroupCallStreamChannels {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetGroupCallStreamChannels {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        return new GetGroupCallStreamChannels(args);
    }
}