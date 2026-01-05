import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeTodoItem } from "../../types/TypeTodoItem";
import { TypeUpdates } from "../../types/TypeUpdates";

export class AppendTodoList extends MTProtoRequest {
    static CONSTRUCTOR_ID = 564531287;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.AppendTodoList";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike;
    list!: TypeTodoItem[];

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike, list?: TypeTodoItem[] } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.list = args.list!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(564531287, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        writer.writeVector(this.list, (item) => {
            writer.write(item.getBytes());
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

    static fromReader(reader: BinaryReader): AppendTodoList {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _list = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.list = _list;
        return new AppendTodoList(args);
    }
}