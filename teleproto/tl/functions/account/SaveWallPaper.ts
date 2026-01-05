import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputWallPaper } from "../../types/TypeInputWallPaper";
import { TypeWallPaperSettings } from "../../types/TypeWallPaperSettings";

export class SaveWallPaper extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1817860919;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.SaveWallPaper";
    static classType = "request";

    wallpaper!: TypeInputWallPaper;
    unsave!: boolean;
    settings!: TypeWallPaperSettings;

    constructor(args: { wallpaper?: TypeInputWallPaper, unsave?: boolean, settings?: TypeWallPaperSettings } = {}) {
        super();
        this.wallpaper = args.wallpaper!;
        this.unsave = args.unsave!;
        this.settings = args.settings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1817860919, false);
        writer.write(this.wallpaper.getBytes());
        writer.tgWriteBool(this.unsave);
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

    static fromReader(reader: BinaryReader): SaveWallPaper {
        const args: any = {};
        const _wallpaper = reader.tgReadObject();
        args.wallpaper = _wallpaper;
        const _unsave = reader.tgReadBool();
        args.unsave = _unsave;
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        return new SaveWallPaper(args);
    }
}