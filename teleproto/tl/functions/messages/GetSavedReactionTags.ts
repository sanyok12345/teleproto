import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeSavedReactionTags } from "../../types/messages/TypeSavedReactionTags";

export class GetSavedReactionTags extends MTProtoRequest {
    static CONSTRUCTOR_ID = 909631579;
    static SUBCLASS_OF_ID = 2744867811;
    static className = "messages.GetSavedReactionTags";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    hash?: bigint;

    constructor(args: { flags?: number, peer?: EntityLike, hash?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(909631579, false);
        let flags = 0;
        if (this.peer !== undefined && this.peer !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.peer !== undefined && this.peer !== null) {
            writer.write((this.peer as any).getBytes());
        }
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSavedReactionTags {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSavedReactionTags {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _peer = reader.tgReadObject();
            args.peer = _peer;
        } else {
            args.peer = undefined;
        }
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetSavedReactionTags(args);
    }
}