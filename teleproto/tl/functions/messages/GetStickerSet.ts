import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputStickerSet } from "../../types/TypeInputStickerSet";
import { TypeStickerSet } from "../../types/messages/TypeStickerSet";

export class GetStickerSet extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3365989492;
    static SUBCLASS_OF_ID = 2607827546;
    static className = "messages.GetStickerSet";
    static classType = "request";

    stickerset!: TypeInputStickerSet;
    hash?: number;

    constructor(args: { stickerset?: TypeInputStickerSet, hash?: number } = {}) {
        super();
        this.stickerset = args.stickerset!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3365989492, false);
        writer.write(this.stickerset.getBytes());
        writer.writeInt(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStickerSet {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStickerSet {
        const args: any = {};
        const _stickerset = reader.tgReadObject();
        args.stickerset = _stickerset;
        const _hash = reader.readInt();
        args.hash = _hash;
        return new GetStickerSet(args);
    }
}