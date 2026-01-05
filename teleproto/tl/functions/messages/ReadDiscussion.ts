import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";

export class ReadDiscussion extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4147227124;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ReadDiscussion";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike;
    readMaxId!: number;

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike, readMaxId?: number } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.readMaxId = args.readMaxId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4147227124, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        writer.writeInt(this.readMaxId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReadDiscussion {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _readMaxId = reader.readInt();
        args.readMaxId = _readMaxId;
        return new ReadDiscussion(args);
    }
}