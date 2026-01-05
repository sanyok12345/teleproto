import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { MessageIDLike } from "./../../define";

export class WebViewMessageSent extends TLObject {
    static CONSTRUCTOR_ID = 211046684;
    static SUBCLASS_OF_ID = 1977914130;
    static className = "WebViewMessageSent";
    static classType = "constructor";

    flags!: number;
    msgId?: MessageIDLike;

    constructor(args: { flags?: number, msgId?: MessageIDLike } = {}) {
        super();
        this.flags = args.flags!;
        this.msgId = args.msgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(211046684, false);
        let flags = 0;
        if (this.msgId !== undefined && this.msgId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.msgId !== undefined && this.msgId !== null) {
            if (typeof this.msgId === 'number') {
                writer.writeInt(this.msgId);
            } else {
                writer.writeInt((this.msgId as any).id);
            }
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebViewMessageSent {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _msgId = reader.tgReadObject();
            args.msgId = _msgId;
        } else {
            args.msgId = undefined;
        }
        return new WebViewMessageSent(args);
    }
}