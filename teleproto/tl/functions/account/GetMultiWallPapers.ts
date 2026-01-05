import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputWallPaper } from "../../types/TypeInputWallPaper";
import { TypeWallPaper } from "../../types/TypeWallPaper";

export class GetMultiWallPapers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1705865692;
    static SUBCLASS_OF_ID = 2395165315;
    static className = "account.GetMultiWallPapers";
    static classType = "request";

    wallpapers!: TypeInputWallPaper[];

    constructor(args: { wallpapers?: TypeInputWallPaper[] } = {}) {
        super();
        this.wallpapers = args.wallpapers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1705865692, false);
        writer.writeVector(this.wallpapers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeWallPaper[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetMultiWallPapers {
        const args: any = {};
        const _wallpapers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.wallpapers = _wallpapers;
        return new GetMultiWallPapers(args);
    }
}