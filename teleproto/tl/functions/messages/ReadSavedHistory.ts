import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ReadSavedHistory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3125427035;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ReadSavedHistory";
    static classType = "request";

    parentPeer!: EntityLike;
    peer?: EntityLike;
    maxId?: number;

    constructor(args: { parentPeer?: EntityLike, peer?: EntityLike, maxId?: number } = {}) {
        super();
        this.parentPeer = args.parentPeer!;
        this.peer = args.peer;
        this.maxId = args.maxId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3125427035, false);
        writer.write((this.parentPeer as any).getBytes());
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.maxId!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReadSavedHistory {
        const args: any = {};
        const _parentPeer = reader.tgReadObject();
        args.parentPeer = _parentPeer;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        return new ReadSavedHistory(args);
    }
}