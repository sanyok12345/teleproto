import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputFile } from "../../types/TypeInputFile";
import { TypeWallPaperSettings } from "../../types/TypeWallPaperSettings";
import { TypeWallPaper } from "../../types/TypeWallPaper";

export class UploadWallPaper extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3818557187;
    static SUBCLASS_OF_ID = 2527250827;
    static className = "account.UploadWallPaper";
    static classType = "request";

    flags?: number;
    forChat?: boolean;
    file!: TypeInputFile;
    mimeType!: string;
    settings!: TypeWallPaperSettings;

    constructor(args: { flags?: number, forChat?: boolean, file?: TypeInputFile, mimeType?: string, settings?: TypeWallPaperSettings } = {}) {
        super();
        this.flags = args.flags;
        this.forChat = args.forChat;
        this.file = args.file!;
        this.mimeType = args.mimeType!;
        this.settings = args.settings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3818557187, false);
        let flags = 0;
        if (this.forChat) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.forChat !== undefined && this.forChat !== null) {
        }
        writer.write(this.file.getBytes());
        writer.tgWriteString(this.mimeType);
        writer.write(this.settings.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeWallPaper {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UploadWallPaper {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _forChat = true;
            args.forChat = _forChat;
        } else {
            args.forChat = false;
        }
        const _file = reader.tgReadObject();
        args.file = _file;
        const _mimeType = reader.tgReadString();
        args.mimeType = _mimeType;
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        return new UploadWallPaper(args);
    }
}