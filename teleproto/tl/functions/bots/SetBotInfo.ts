import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class SetBotInfo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 282013987;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.SetBotInfo";
    static classType = "request";

    flags?: number;
    bot?: EntityLike;
    langCode?: string;
    name?: string;
    about?: string;
    description?: string;

    constructor(args: { flags?: number, bot?: EntityLike, langCode?: string, name?: string, about?: string, description?: string } = {}) {
        super();
        this.flags = args.flags;
        this.bot = args.bot;
        this.langCode = args.langCode;
        this.name = args.name;
        this.about = args.about;
        this.description = args.description;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(282013987, false);
        let flags = 0;
        if (this.bot !== undefined && this.bot !== null) { flags |= 1 << 2; }
        if (this.name !== undefined && this.name !== null) { flags |= 1 << 3; }
        if (this.about !== undefined && this.about !== null) { flags |= 1 << 0; }
        if (this.description !== undefined && this.description !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.bot !== undefined && this.bot !== null) {
            writer.write((this.bot as any).getBytes());
        }
        writer.tgWriteString(this.langCode!);
        if (this.name !== undefined && this.name !== null) {
            writer.tgWriteString(this.name);
        }
        if (this.about !== undefined && this.about !== null) {
            writer.tgWriteString(this.about);
        }
        if (this.description !== undefined && this.description !== null) {
            writer.tgWriteString(this.description);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetBotInfo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _bot = reader.tgReadObject();
            args.bot = _bot;
        } else {
            args.bot = undefined;
        }
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        if (args.flags & (1 << 3)) {
            const _name = reader.tgReadString();
            args.name = _name;
        } else {
            args.name = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _about = reader.tgReadString();
            args.about = _about;
        } else {
            args.about = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _description = reader.tgReadString();
            args.description = _description;
        } else {
            args.description = undefined;
        }
        return new SetBotInfo(args);
    }
}