import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class SetDiscussionGroup extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1079520178;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "channels.SetDiscussionGroup";
    static classType = "request";

    broadcast!: EntityLike;
    group!: EntityLike;

    constructor(args: { broadcast?: EntityLike, group?: EntityLike } = {}) {
        super();
        this.broadcast = args.broadcast!;
        this.group = args.group!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1079520178, false);
        writer.write((this.broadcast as any).getBytes());
        writer.write((this.group as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetDiscussionGroup {
        const args: any = {};
        const _broadcast = reader.tgReadObject();
        args.broadcast = _broadcast;
        const _group = reader.tgReadObject();
        args.group = _group;
        return new SetDiscussionGroup(args);
    }
}