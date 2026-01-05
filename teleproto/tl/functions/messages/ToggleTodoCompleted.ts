import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ToggleTodoCompleted extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3554685220;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.ToggleTodoCompleted";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike;
    completed!: number[];
    incompleted!: number[];

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike, completed?: number[], incompleted?: number[] } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.completed = args.completed!;
        this.incompleted = args.incompleted!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3554685220, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        writer.writeVector(this.completed, (item) => {
            writer.writeInt(item);
        });
        writer.writeVector(this.incompleted, (item) => {
            writer.writeInt(item);
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

    static fromReader(reader: BinaryReader): ToggleTodoCompleted {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _completed = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.completed = _completed;
        const _incompleted = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.incompleted = _incompleted;
        return new ToggleTodoCompleted(args);
    }
}