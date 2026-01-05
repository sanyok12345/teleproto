import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeGroupCallStreamRtmpUrl } from "../../types/phone/TypeGroupCallStreamRtmpUrl";

export class GetGroupCallStreamRtmpUrl extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1525991226;
    static SUBCLASS_OF_ID = 3522500043;
    static className = "phone.GetGroupCallStreamRtmpUrl";
    static classType = "request";

    flags?: number;
    liveStory?: boolean;
    peer?: EntityLike;
    revoke!: boolean;

    constructor(args: { flags?: number, liveStory?: boolean, peer?: EntityLike, revoke?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.liveStory = args.liveStory;
        this.peer = args.peer;
        this.revoke = args.revoke!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1525991226, false);
        let flags = 0;
        if (this.liveStory) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.liveStory !== undefined && this.liveStory !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteBool(this.revoke);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeGroupCallStreamRtmpUrl {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetGroupCallStreamRtmpUrl {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _liveStory = true;
            args.liveStory = _liveStory;
        } else {
            args.liveStory = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _revoke = reader.tgReadBool();
        args.revoke = _revoke;
        return new GetGroupCallStreamRtmpUrl(args);
    }
}