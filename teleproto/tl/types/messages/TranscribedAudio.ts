import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class TranscribedAudio extends TLObject {
    static CONSTRUCTOR_ID = 3485063511;
    static SUBCLASS_OF_ID = 565332278;
    static className = "messages.TranscribedAudio";
    static classType = "constructor";

    flags!: number;
    pending?: boolean;
    transcriptionId!: bigint;
    text!: string;
    trialRemainsNum?: number;
    trialRemainsUntilDate?: number;

    constructor(args: { flags?: number, pending?: boolean, transcriptionId?: bigint, text?: string, trialRemainsNum?: number, trialRemainsUntilDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.pending = args.pending;
        this.transcriptionId = args.transcriptionId!;
        this.text = args.text!;
        this.trialRemainsNum = args.trialRemainsNum;
        this.trialRemainsUntilDate = args.trialRemainsUntilDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3485063511, false);
        let flags = 0;
        if (this.pending) { flags |= 1 << 0; }
        if (this.trialRemainsNum !== undefined && this.trialRemainsNum !== null) { flags |= 1 << 1; }
        if (this.trialRemainsUntilDate !== undefined && this.trialRemainsUntilDate !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.pending !== undefined && this.pending !== null) {
        }
        writer.writeLargeInt(this.transcriptionId, 64);
        writer.tgWriteString(this.text);
        if (this.trialRemainsNum !== undefined && this.trialRemainsNum !== null) {
            writer.writeInt(this.trialRemainsNum);
        }
        if (this.trialRemainsUntilDate !== undefined && this.trialRemainsUntilDate !== null) {
            writer.writeInt(this.trialRemainsUntilDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TranscribedAudio {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _pending = true;
            args.pending = _pending;
        } else {
            args.pending = false;
        }
        const _transcriptionId = reader.readLargeInt(64);
        args.transcriptionId = _transcriptionId;
        const _text = reader.tgReadString();
        args.text = _text;
        if (args.flags & (1 << 1)) {
            const _trialRemainsNum = reader.readInt();
            args.trialRemainsNum = _trialRemainsNum;
        } else {
            args.trialRemainsNum = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _trialRemainsUntilDate = reader.readInt();
            args.trialRemainsUntilDate = _trialRemainsUntilDate;
        } else {
            args.trialRemainsUntilDate = undefined;
        }
        return new TranscribedAudio(args);
    }
}