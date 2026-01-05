import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStoryStats } from "../../types/stats/TypeStoryStats";

export class GetStoryStats extends MTProtoRequest {
    static CONSTRUCTOR_ID = 927985472;
    static SUBCLASS_OF_ID = 2337096660;
    static className = "stats.GetStoryStats";
    static classType = "request";

    flags?: number;
    dark?: boolean;
    peer?: EntityLike;
    id?: number;

    constructor(args: { flags?: number, dark?: boolean, peer?: EntityLike, id?: number } = {}) {
        super();
        this.flags = args.flags;
        this.dark = args.dark;
        this.peer = args.peer;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(927985472, false);
        let flags = 0;
        if (this.dark) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.dark !== undefined && this.dark !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStoryStats {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStoryStats {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _dark = true;
            args.dark = _dark;
        } else {
            args.dark = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        return new GetStoryStats(args);
    }
}