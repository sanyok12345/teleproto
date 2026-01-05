import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ClickSponsoredMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2184512894;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ClickSponsoredMessage";
    static classType = "request";

    flags?: number;
    media?: boolean;
    fullscreen?: boolean;
    randomId!: Buffer;

    constructor(args: { flags?: number, media?: boolean, fullscreen?: boolean, randomId?: Buffer } = {}) {
        super();
        this.flags = args.flags;
        this.media = args.media;
        this.fullscreen = args.fullscreen;
        this.randomId = args.randomId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2184512894, false);
        let flags = 0;
        if (this.media) { flags |= 1 << 0; }
        if (this.fullscreen) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.media !== undefined && this.media !== null) {
        }
        if (this.fullscreen !== undefined && this.fullscreen !== null) {
        }
        writer.tgWriteBytes(this.randomId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ClickSponsoredMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _media = true;
            args.media = _media;
        } else {
            args.media = false;
        }
        if (args.flags & (1 << 1)) {
            const _fullscreen = true;
            args.fullscreen = _fullscreen;
        } else {
            args.fullscreen = false;
        }
        const _randomId = reader.tgReadBytes();
        args.randomId = _randomId;
        return new ClickSponsoredMessage(args);
    }
}