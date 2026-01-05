import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeHighScores } from "../../types/messages/TypeHighScores";

export class GetGameHighScores extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3894568093;
    static SUBCLASS_OF_ID = 1825412605;
    static className = "messages.GetGameHighScores";
    static classType = "request";

    peer?: EntityLike;
    id?: number;
    userId!: EntityLike;

    constructor(args: { peer?: EntityLike, id?: number, userId?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
        this.id = args.id;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3894568093, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        writer.write((this.userId as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeHighScores {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetGameHighScores {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new GetGameHighScores(args);
    }
}