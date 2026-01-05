import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { MessageIDLike } from "./../../define";

export class UpdateTranscribedAudio extends TLObject {
    static CONSTRUCTOR_ID = 8703322;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateTranscribedAudio";
    static classType = "constructor";

    flags!: number;
    pending?: boolean;
    peer!: TypePeer;
    msgId!: MessageIDLike;
    transcriptionId!: bigint;
    text!: string;

    constructor(args: { flags?: number, pending?: boolean, peer?: TypePeer, msgId?: MessageIDLike, transcriptionId?: bigint, text?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.pending = args.pending;
        this.peer = args.peer!;
        this.msgId = args.msgId!;
        this.transcriptionId = args.transcriptionId!;
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(8703322, false);
        let flags = 0;
        if (this.pending) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.pending !== undefined && this.pending !== null) {
        }
        writer.write(this.peer.getBytes());
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        writer.writeLargeInt(this.transcriptionId, 64);
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateTranscribedAudio {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _pending = true;
            args.pending = _pending;
        } else {
            args.pending = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _transcriptionId = reader.readLargeInt(64);
        args.transcriptionId = _transcriptionId;
        const _text = reader.tgReadString();
        args.text = _text;
        return new UpdateTranscribedAudio(args);
    }
}