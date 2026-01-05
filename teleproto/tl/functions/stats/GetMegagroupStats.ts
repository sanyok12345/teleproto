import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMegagroupStats } from "../../types/stats/TypeMegagroupStats";

export class GetMegagroupStats extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3705636359;
    static SUBCLASS_OF_ID = 1532608141;
    static className = "stats.GetMegagroupStats";
    static classType = "request";

    flags?: number;
    dark?: boolean;
    channel?: EntityLike;

    constructor(args: { flags?: number, dark?: boolean, channel?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.dark = args.dark;
        this.channel = args.channel;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3705636359, false);
        let flags = 0;
        if (this.dark) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.dark !== undefined && this.dark !== null) {
        }
        writer.write((this.channel! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMegagroupStats {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetMegagroupStats {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _dark = true;
            args.dark = _dark;
        } else {
            args.dark = false;
        }
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        return new GetMegagroupStats(args);
    }
}