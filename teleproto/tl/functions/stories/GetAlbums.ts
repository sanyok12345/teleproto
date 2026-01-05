import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeAlbums } from "../../types/stories/TypeAlbums";

export class GetAlbums extends MTProtoRequest {
    static CONSTRUCTOR_ID = 632548039;
    static SUBCLASS_OF_ID = 94846265;
    static className = "stories.GetAlbums";
    static classType = "request";

    peer?: EntityLike;
    hash?: bigint;

    constructor(args: { peer?: EntityLike, hash?: bigint } = {}) {
        super();
        this.peer = args.peer;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(632548039, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAlbums {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAlbums {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetAlbums(args);
    }
}