import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputChatPhoto } from "../../types/TypeInputChatPhoto";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditPhoto extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4046346185;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.EditPhoto";
    static classType = "request";

    channel?: EntityLike;
    photo!: TypeInputChatPhoto;

    constructor(args: { channel?: EntityLike, photo?: TypeInputChatPhoto } = {}) {
        super();
        this.channel = args.channel;
        this.photo = args.photo!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4046346185, false);
        writer.write((this.channel! as any).getBytes());
        writer.write(this.photo.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditPhoto {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _photo = reader.tgReadObject();
        args.photo = _photo;
        return new EditPhoto(args);
    }
}