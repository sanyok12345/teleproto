import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPhoneCall } from "../../types/TypeInputPhoneCall";
import { TypeInputFile } from "../../types/TypeInputFile";

export class SaveCallLog extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1092913030;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "phone.SaveCallLog";
    static classType = "request";

    peer?: TypeInputPhoneCall;
    file!: TypeInputFile;

    constructor(args: { peer?: TypeInputPhoneCall, file?: TypeInputFile } = {}) {
        super();
        this.peer = args.peer;
        this.file = args.file!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1092913030, false);
        writer.write(this.peer!.getBytes());
        writer.write(this.file.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveCallLog {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _file = reader.tgReadObject();
        args.file = _file;
        return new SaveCallLog(args);
    }
}