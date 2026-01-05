import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputBotInlineMessageID } from "../../types/TypeInputBotInlineMessageID";
import { EntityLike } from "../../types/../../define";

export class SetInlineGameScore extends MTProtoRequest {
    static CONSTRUCTOR_ID = 363700068;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SetInlineGameScore";
    static classType = "request";

    flags?: number;
    editMessage?: boolean;
    force?: boolean;
    id?: TypeInputBotInlineMessageID;
    userId!: EntityLike;
    score!: number;

    constructor(args: { flags?: number, editMessage?: boolean, force?: boolean, id?: TypeInputBotInlineMessageID, userId?: EntityLike, score?: number } = {}) {
        super();
        this.flags = args.flags;
        this.editMessage = args.editMessage;
        this.force = args.force;
        this.id = args.id;
        this.userId = args.userId!;
        this.score = args.score!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(363700068, false);
        let flags = 0;
        if (this.editMessage) { flags |= 1 << 0; }
        if (this.force) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.editMessage !== undefined && this.editMessage !== null) {
        }
        if (this.force !== undefined && this.force !== null) {
        }
        writer.write(this.id!.getBytes());
        writer.write((this.userId as any).getBytes());
        writer.writeInt(this.score);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetInlineGameScore {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _editMessage = true;
            args.editMessage = _editMessage;
        } else {
            args.editMessage = false;
        }
        if (args.flags & (1 << 1)) {
            const _force = true;
            args.force = _force;
        } else {
            args.force = false;
        }
        const _id = reader.tgReadObject();
        args.id = _id;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _score = reader.readInt();
        args.score = _score;
        return new SetInlineGameScore(args);
    }
}