import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { MessageIDLike } from "./../../define";

export class SearchResultPosition extends TLObject {
    static CONSTRUCTOR_ID = 2137295719;
    static SUBCLASS_OF_ID = 3101824532;
    static className = "SearchResultPosition";
    static classType = "constructor";

    msgId!: MessageIDLike;
    date!: number;
    offset!: number;

    constructor(args: { msgId?: MessageIDLike, date?: number, offset?: number } = {}) {
        super();
        this.msgId = args.msgId!;
        this.date = args.date!;
        this.offset = args.offset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2137295719, false);
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        writer.writeInt(this.date);
        writer.writeInt(this.offset);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SearchResultPosition {
        const args: any = {};
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _date = reader.readInt();
        args.date = _date;
        const _offset = reader.readInt();
        args.offset = _offset;
        return new SearchResultPosition(args);
    }
}