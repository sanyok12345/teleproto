import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class UpdateColor extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3635033713;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.UpdateColor";
    static classType = "request";

    flags?: number;
    forProfile?: boolean;
    channel?: EntityLike;
    color?: number;
    backgroundEmojiId?: bigint;

    constructor(args: { flags?: number, forProfile?: boolean, channel?: EntityLike, color?: number, backgroundEmojiId?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.forProfile = args.forProfile;
        this.channel = args.channel;
        this.color = args.color;
        this.backgroundEmojiId = args.backgroundEmojiId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3635033713, false);
        let flags = 0;
        if (this.forProfile) { flags |= 1 << 1; }
        if (this.color !== undefined && this.color !== null) { flags |= 1 << 2; }
        if (this.backgroundEmojiId !== undefined && this.backgroundEmojiId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.forProfile !== undefined && this.forProfile !== null) {
        }
        writer.write((this.channel! as any).getBytes());
        if (this.color !== undefined && this.color !== null) {
            writer.writeInt(this.color);
        }
        if (this.backgroundEmojiId !== undefined && this.backgroundEmojiId !== null) {
            writer.writeLargeInt(this.backgroundEmojiId, 64);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateColor {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _forProfile = true;
            args.forProfile = _forProfile;
        } else {
            args.forProfile = false;
        }
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        if (args.flags & (1 << 2)) {
            const _color = reader.readInt();
            args.color = _color;
        } else {
            args.color = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _backgroundEmojiId = reader.readLargeInt(64);
            args.backgroundEmojiId = _backgroundEmojiId;
        } else {
            args.backgroundEmojiId = undefined;
        }
        return new UpdateColor(args);
    }
}