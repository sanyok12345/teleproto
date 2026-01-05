import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputWallPaper } from "../../types/TypeInputWallPaper";
import { TypeWallPaper } from "../../types/TypeWallPaper";

export class GetWallPaper extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4237155306;
    static SUBCLASS_OF_ID = 2527250827;
    static className = "account.GetWallPaper";
    static classType = "request";

    wallpaper!: TypeInputWallPaper;

    constructor(args: { wallpaper?: TypeInputWallPaper } = {}) {
        super();
        this.wallpaper = args.wallpaper!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4237155306, false);
        writer.write(this.wallpaper.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeWallPaper {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetWallPaper {
        const args: any = {};
        const _wallpaper = reader.tgReadObject();
        args.wallpaper = _wallpaper;
        return new GetWallPaper(args);
    }
}