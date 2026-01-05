import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputWallPaper } from "../../types/TypeInputWallPaper";
import { TypeWallPaperSettings } from "../../types/TypeWallPaperSettings";

export class InstallWallPaper extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4276967273;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.InstallWallPaper";
    static classType = "request";

    wallpaper!: TypeInputWallPaper;
    settings!: TypeWallPaperSettings;

    constructor(args: { wallpaper?: TypeInputWallPaper, settings?: TypeWallPaperSettings } = {}) {
        super();
        this.wallpaper = args.wallpaper!;
        this.settings = args.settings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4276967273, false);
        writer.write(this.wallpaper.getBytes());
        writer.write(this.settings.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InstallWallPaper {
        const args: any = {};
        const _wallpaper = reader.tgReadObject();
        args.wallpaper = _wallpaper;
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        return new InstallWallPaper(args);
    }
}