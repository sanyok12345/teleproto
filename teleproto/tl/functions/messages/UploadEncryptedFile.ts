import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputEncryptedChat } from "../../types/TypeInputEncryptedChat";
import { TypeInputEncryptedFile } from "../../types/TypeInputEncryptedFile";
import { TypeEncryptedFile } from "../../types/TypeEncryptedFile";

export class UploadEncryptedFile extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1347929239;
    static SUBCLASS_OF_ID = 2217371584;
    static className = "messages.UploadEncryptedFile";
    static classType = "request";

    peer?: TypeInputEncryptedChat;
    file!: TypeInputEncryptedFile;

    constructor(args: { peer?: TypeInputEncryptedChat, file?: TypeInputEncryptedFile } = {}) {
        super();
        this.peer = args.peer;
        this.file = args.file!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1347929239, false);
        writer.write(this.peer!.getBytes());
        writer.write(this.file.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEncryptedFile {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UploadEncryptedFile {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _file = reader.tgReadObject();
        args.file = _file;
        return new UploadEncryptedFile(args);
    }
}