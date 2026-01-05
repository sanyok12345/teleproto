import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ReportReaction extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1063567478;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ReportReaction";
    static classType = "request";

    peer?: EntityLike;
    id?: number;
    reactionPeer!: EntityLike;

    constructor(args: { peer?: EntityLike, id?: number, reactionPeer?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
        this.id = args.id;
        this.reactionPeer = args.reactionPeer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1063567478, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        writer.write((this.reactionPeer as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReportReaction {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        const _reactionPeer = reader.tgReadObject();
        args.reactionPeer = _reactionPeer;
        return new ReportReaction(args);
    }
}