import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageReplies } from "./TypeMessageReplies";

export class MessageViews extends TLObject {
    static CONSTRUCTOR_ID = 1163625789;
    static SUBCLASS_OF_ID = 1018201017;
    static className = "MessageViews";
    static classType = "constructor";

    flags!: number;
    views?: number;
    forwards?: number;
    replies?: TypeMessageReplies;

    constructor(args: { flags?: number, views?: number, forwards?: number, replies?: TypeMessageReplies } = {}) {
        super();
        this.flags = args.flags!;
        this.views = args.views;
        this.forwards = args.forwards;
        this.replies = args.replies;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1163625789, false);
        let flags = 0;
        if (this.views !== undefined && this.views !== null) { flags |= 1 << 0; }
        if (this.forwards !== undefined && this.forwards !== null) { flags |= 1 << 1; }
        if (this.replies !== undefined && this.replies !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.views !== undefined && this.views !== null) {
            writer.writeInt(this.views);
        }
        if (this.forwards !== undefined && this.forwards !== null) {
            writer.writeInt(this.forwards);
        }
        if (this.replies !== undefined && this.replies !== null) {
            writer.write(this.replies.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageViews {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _views = reader.readInt();
            args.views = _views;
        } else {
            args.views = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _forwards = reader.readInt();
            args.forwards = _forwards;
        } else {
            args.forwards = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _replies = reader.tgReadObject();
            args.replies = _replies;
        } else {
            args.replies = undefined;
        }
        return new MessageViews(args);
    }
}