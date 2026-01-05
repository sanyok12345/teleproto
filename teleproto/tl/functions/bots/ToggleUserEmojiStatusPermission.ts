import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ToggleUserEmojiStatusPermission extends MTProtoRequest {
    static CONSTRUCTOR_ID = 115237778;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.ToggleUserEmojiStatusPermission";
    static classType = "request";

    bot?: EntityLike;
    enabled!: boolean;

    constructor(args: { bot?: EntityLike, enabled?: boolean } = {}) {
        super();
        this.bot = args.bot;
        this.enabled = args.enabled!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(115237778, false);
        writer.write((this.bot! as any).getBytes());
        writer.tgWriteBool(this.enabled);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleUserEmojiStatusPermission {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _enabled = reader.tgReadBool();
        args.enabled = _enabled;
        return new ToggleUserEmojiStatusPermission(args);
    }
}