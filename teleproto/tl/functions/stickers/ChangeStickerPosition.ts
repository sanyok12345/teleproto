import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDocument } from "../../types/TypeInputDocument";
import { TypeStickerSet } from "../../types/messages/TypeStickerSet";

export class ChangeStickerPosition extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4290172106;
    static SUBCLASS_OF_ID = 2607827546;
    static className = "stickers.ChangeStickerPosition";
    static classType = "request";

    sticker!: TypeInputDocument;
    position!: number;

    constructor(args: { sticker?: TypeInputDocument, position?: number } = {}) {
        super();
        this.sticker = args.sticker!;
        this.position = args.position!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4290172106, false);
        writer.write(this.sticker.getBytes());
        writer.writeInt(this.position);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStickerSet {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ChangeStickerPosition {
        const args: any = {};
        const _sticker = reader.tgReadObject();
        args.sticker = _sticker;
        const _position = reader.readInt();
        args.position = _position;
        return new ChangeStickerPosition(args);
    }
}