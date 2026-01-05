import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputEncryptedChat } from "../../types/TypeInputEncryptedChat";

export class ReportEncryptedSpam extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1259113487;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ReportEncryptedSpam";
    static classType = "request";

    peer?: TypeInputEncryptedChat;

    constructor(args: { peer?: TypeInputEncryptedChat } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1259113487, false);
        writer.write(this.peer!.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReportEncryptedSpam {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new ReportEncryptedSpam(args);
    }
}