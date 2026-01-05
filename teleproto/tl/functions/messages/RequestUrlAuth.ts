import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeUrlAuthResult } from "../../types/TypeUrlAuthResult";

export class RequestUrlAuth extends MTProtoRequest {
    static CONSTRUCTOR_ID = 428848198;
    static SUBCLASS_OF_ID = 2003159838;
    static className = "messages.RequestUrlAuth";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    msgId?: MessageIDLike;
    buttonId?: number;
    url?: string;

    constructor(args: { flags?: number, peer?: EntityLike, msgId?: MessageIDLike, buttonId?: number, url?: string } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.buttonId = args.buttonId;
        this.url = args.url;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(428848198, false);
        let flags = 0;
        if (this.peer !== undefined && this.peer !== null) { flags |= 1 << 1; }
        if (this.msgId !== undefined && this.msgId !== null) { flags |= 1 << 1; }
        if (this.buttonId !== undefined && this.buttonId !== null) { flags |= 1 << 1; }
        if (this.url !== undefined && this.url !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.peer !== undefined && this.peer !== null) {
            writer.write((this.peer as any).getBytes());
        }
        if (this.msgId !== undefined && this.msgId !== null) {
            if (typeof this.msgId === 'number') {
                writer.writeInt(this.msgId);
            } else {
                writer.writeInt((this.msgId as any).id);
            }
        }
        if (this.buttonId !== undefined && this.buttonId !== null) {
            writer.writeInt(this.buttonId);
        }
        if (this.url !== undefined && this.url !== null) {
            writer.tgWriteString(this.url);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUrlAuthResult {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RequestUrlAuth {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _peer = reader.tgReadObject();
            args.peer = _peer;
        } else {
            args.peer = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _msgId = reader.tgReadObject();
            args.msgId = _msgId;
        } else {
            args.msgId = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _buttonId = reader.readInt();
            args.buttonId = _buttonId;
        } else {
            args.buttonId = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _url = reader.tgReadString();
            args.url = _url;
        } else {
            args.url = undefined;
        }
        return new RequestUrlAuth(args);
    }
}