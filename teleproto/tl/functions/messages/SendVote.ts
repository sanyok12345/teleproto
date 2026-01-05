import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendVote extends MTProtoRequest {
    static CONSTRUCTOR_ID = 283795844;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SendVote";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike;
    options!: Buffer[];

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike, options?: Buffer[] } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.options = args.options!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(283795844, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        writer.writeVector(this.options, (item) => {
            writer.tgWriteBytes(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendVote {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _options = reader.readVector((reader) => {
            const item = reader.tgReadBytes();
            return item;
        });
        args.options = _options;
        return new SendVote(args);
    }
}