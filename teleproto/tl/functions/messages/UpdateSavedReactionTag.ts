import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeReaction } from "../../types/TypeReaction";

export class UpdateSavedReactionTag extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1613331948;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.UpdateSavedReactionTag";
    static classType = "request";

    flags?: number;
    reaction!: TypeReaction;
    title?: string;

    constructor(args: { flags?: number, reaction?: TypeReaction, title?: string } = {}) {
        super();
        this.flags = args.flags;
        this.reaction = args.reaction!;
        this.title = args.title;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1613331948, false);
        let flags = 0;
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.reaction.getBytes());
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
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

    static fromReader(reader: BinaryReader): UpdateSavedReactionTag {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _reaction = reader.tgReadObject();
        args.reaction = _reaction;
        if (args.flags & (1 << 0)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        return new UpdateSavedReactionTag(args);
    }
}