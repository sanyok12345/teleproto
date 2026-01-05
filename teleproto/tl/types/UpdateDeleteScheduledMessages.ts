import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdateDeleteScheduledMessages extends TLObject {
    static CONSTRUCTOR_ID = 4071037315;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateDeleteScheduledMessages";
    static classType = "constructor";

    flags!: number;
    peer!: TypePeer;
    messages!: number[];
    sentMessages?: number[];

    constructor(args: { flags?: number, peer?: TypePeer, messages?: number[], sentMessages?: number[] } = {}) {
        super();
        this.flags = args.flags!;
        this.peer = args.peer!;
        this.messages = args.messages!;
        this.sentMessages = args.sentMessages;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4071037315, false);
        let flags = 0;
        if (this.sentMessages !== undefined && this.sentMessages !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.peer.getBytes());
        writer.writeVector(this.messages, (item) => {
            writer.writeInt(item);
        });
        if (this.sentMessages !== undefined && this.sentMessages !== null) {
            writer.writeVector(this.sentMessages, (item) => {
                writer.writeInt(item);
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateDeleteScheduledMessages {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _messages = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.messages = _messages;
        if (args.flags & (1 << 0)) {
            const _sentMessages = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.sentMessages = _sentMessages;
        } else {
            args.sentMessages = undefined;
        }
        return new UpdateDeleteScheduledMessages(args);
    }
}