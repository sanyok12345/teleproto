import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputStickerSet } from "../../types/TypeInputStickerSet";

export class DeleteStickerSet extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2272281492;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "stickers.DeleteStickerSet";
    static classType = "request";

    stickerset!: TypeInputStickerSet;

    constructor(args: { stickerset?: TypeInputStickerSet } = {}) {
        super();
        this.stickerset = args.stickerset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2272281492, false);
        writer.write(this.stickerset.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteStickerSet {
        const args: any = {};
        const _stickerset = reader.tgReadObject();
        args.stickerset = _stickerset;
        return new DeleteStickerSet(args);
    }
}