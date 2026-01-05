import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputStickerSet } from "../../types/TypeInputStickerSet";

export class SetStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3935085817;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "channels.SetStickers";
    static classType = "request";

    channel?: EntityLike;
    stickerset!: TypeInputStickerSet;

    constructor(args: { channel?: EntityLike, stickerset?: TypeInputStickerSet } = {}) {
        super();
        this.channel = args.channel;
        this.stickerset = args.stickerset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3935085817, false);
        writer.write((this.channel! as any).getBytes());
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

    static fromReader(reader: BinaryReader): SetStickers {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _stickerset = reader.tgReadObject();
        args.stickerset = _stickerset;
        return new SetStickers(args);
    }
}