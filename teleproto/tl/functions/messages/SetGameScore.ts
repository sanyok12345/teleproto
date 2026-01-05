import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SetGameScore extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2398678208;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SetGameScore";
    static classType = "request";

    flags?: number;
    editMessage?: boolean;
    force?: boolean;
    peer?: EntityLike;
    id?: number;
    userId!: EntityLike;
    score!: number;

    constructor(args: { flags?: number, editMessage?: boolean, force?: boolean, peer?: EntityLike, id?: number, userId?: EntityLike, score?: number } = {}) {
        super();
        this.flags = args.flags;
        this.editMessage = args.editMessage;
        this.force = args.force;
        this.peer = args.peer;
        this.id = args.id;
        this.userId = args.userId!;
        this.score = args.score!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2398678208, false);
        let flags = 0;
        if (this.editMessage) { flags |= 1 << 0; }
        if (this.force) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.editMessage !== undefined && this.editMessage !== null) {
        }
        if (this.force !== undefined && this.force !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        writer.write((this.userId as any).getBytes());
        writer.writeInt(this.score);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetGameScore {
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
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _score = reader.readInt();
        args.score = _score;
        return new SetGameScore(args);
    }
}