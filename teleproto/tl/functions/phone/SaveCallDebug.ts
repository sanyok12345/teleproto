import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPhoneCall } from "../../types/TypeInputPhoneCall";
import { TypeDataJSON } from "../../types/TypeDataJSON";

export class SaveCallDebug extends MTProtoRequest {
    static CONSTRUCTOR_ID = 662363518;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "phone.SaveCallDebug";
    static classType = "request";

    peer?: TypeInputPhoneCall;
    debug!: TypeDataJSON;

    constructor(args: { peer?: TypeInputPhoneCall, debug?: TypeDataJSON } = {}) {
        super();
        this.peer = args.peer;
        this.debug = args.debug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(662363518, false);
        writer.write(this.peer!.getBytes());
        writer.write(this.debug.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveCallDebug {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _debug = reader.tgReadObject();
        args.debug = _debug;
        return new SaveCallDebug(args);
    }
}