import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputReplyTo } from "../../types/TypeInputReplyTo";

export class ProlongWebView extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2966952579;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ProlongWebView";
    static classType = "request";

    flags?: number;
    silent?: boolean;
    peer?: EntityLike;
    bot?: EntityLike;
    queryId?: bigint;
    replyTo?: TypeInputReplyTo;
    sendAs?: EntityLike;

    constructor(args: { flags?: number, silent?: boolean, peer?: EntityLike, bot?: EntityLike, queryId?: bigint, replyTo?: TypeInputReplyTo, sendAs?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.silent = args.silent;
        this.peer = args.peer;
        this.bot = args.bot;
        this.queryId = args.queryId;
        this.replyTo = args.replyTo;
        this.sendAs = args.sendAs;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2966952579, false);
        let flags = 0;
        if (this.silent) { flags |= 1 << 5; }
        if (this.replyTo !== undefined && this.replyTo !== null) { flags |= 1 << 0; }
        if (this.sendAs !== undefined && this.sendAs !== null) { flags |= 1 << 13; }
        writer.writeInt(flags, false);
        if (this.silent !== undefined && this.silent !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.write((this.bot! as any).getBytes());
        writer.writeLargeInt(this.queryId!, 64);
        if (this.replyTo !== undefined && this.replyTo !== null) {
            writer.write(this.replyTo.getBytes());
        }
        if (this.sendAs !== undefined && this.sendAs !== null) {
            writer.write((this.sendAs as any).getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ProlongWebView {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 5)) {
            const _silent = true;
            args.silent = _silent;
        } else {
            args.silent = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        if (args.flags & (1 << 0)) {
            const _replyTo = reader.tgReadObject();
            args.replyTo = _replyTo;
        } else {
            args.replyTo = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _sendAs = reader.tgReadObject();
            args.sendAs = _sendAs;
        } else {
            args.sendAs = undefined;
        }
        return new ProlongWebView(args);
    }
}