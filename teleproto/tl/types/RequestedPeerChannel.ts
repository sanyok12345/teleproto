import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";

export class RequestedPeerChannel extends TLObject {
    static CONSTRUCTOR_ID = 2342781924;
    static SUBCLASS_OF_ID = 3263724560;
    static className = "RequestedPeerChannel";
    static classType = "constructor";

    flags!: number;
    channelId!: bigint;
    title?: string;
    username?: string;
    photo?: TypePhoto;

    constructor(args: { flags?: number, channelId?: bigint, title?: string, username?: string, photo?: TypePhoto } = {}) {
        super();
        this.flags = args.flags!;
        this.channelId = args.channelId!;
        this.title = args.title;
        this.username = args.username;
        this.photo = args.photo;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2342781924, false);
        let flags = 0;
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 0; }
        if (this.username !== undefined && this.username !== null) { flags |= 1 << 1; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.channelId, 64);
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.username !== undefined && this.username !== null) {
            writer.tgWriteString(this.username);
        }
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RequestedPeerChannel {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        if (args.flags & (1 << 0)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _username = reader.tgReadString();
            args.username = _username;
        } else {
            args.username = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        return new RequestedPeerChannel(args);
    }
}