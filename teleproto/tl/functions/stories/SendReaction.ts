import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeReaction } from "../../types/TypeReaction";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendReaction extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2144810674;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "stories.SendReaction";
    static classType = "request";

    flags?: number;
    addToRecent?: boolean;
    peer?: EntityLike;
    storyId!: number;
    reaction!: TypeReaction;

    constructor(args: { flags?: number, addToRecent?: boolean, peer?: EntityLike, storyId?: number, reaction?: TypeReaction } = {}) {
        super();
        this.flags = args.flags;
        this.addToRecent = args.addToRecent;
        this.peer = args.peer;
        this.storyId = args.storyId!;
        this.reaction = args.reaction!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2144810674, false);
        let flags = 0;
        if (this.addToRecent) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.addToRecent !== undefined && this.addToRecent !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.storyId);
        writer.write(this.reaction.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendReaction {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _addToRecent = true;
            args.addToRecent = _addToRecent;
        } else {
            args.addToRecent = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _storyId = reader.readInt();
        args.storyId = _storyId;
        const _reaction = reader.tgReadObject();
        args.reaction = _reaction;
        return new SendReaction(args);
    }
}