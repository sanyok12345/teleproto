import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeBotInfo } from "../../types/bots/TypeBotInfo";

export class GetBotInfo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3705214205;
    static SUBCLASS_OF_ID = 3397067317;
    static className = "bots.GetBotInfo";
    static classType = "request";

    flags?: number;
    bot?: EntityLike;
    langCode?: string;

    constructor(args: { flags?: number, bot?: EntityLike, langCode?: string } = {}) {
        super();
        this.flags = args.flags;
        this.bot = args.bot;
        this.langCode = args.langCode;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3705214205, false);
        let flags = 0;
        if (this.bot !== undefined && this.bot !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.bot !== undefined && this.bot !== null) {
            writer.write((this.bot as any).getBytes());
        }
        writer.tgWriteString(this.langCode!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBotInfo {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBotInfo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _bot = reader.tgReadObject();
            args.bot = _bot;
        } else {
            args.bot = undefined;
        }
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        return new GetBotInfo(args);
    }
}