import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";

export class RequestedPeerChat extends TLObject {
    static CONSTRUCTOR_ID = 1929860175;
    static SUBCLASS_OF_ID = 3263724560;
    static className = "RequestedPeerChat";
    static classType = "constructor";

    flags!: number;
    chatId!: bigint;
    title?: string;
    photo?: TypePhoto;

    constructor(args: { flags?: number, chatId?: bigint, title?: string, photo?: TypePhoto } = {}) {
        super();
        this.flags = args.flags!;
        this.chatId = args.chatId!;
        this.title = args.title;
        this.photo = args.photo;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1929860175, false);
        let flags = 0;
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 0; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.chatId, 64);
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RequestedPeerChat {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        if (args.flags & (1 << 0)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        return new RequestedPeerChat(args);
    }
}