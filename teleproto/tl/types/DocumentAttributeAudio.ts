import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DocumentAttributeAudio extends TLObject {
    static CONSTRUCTOR_ID = 2555574726;
    static SUBCLASS_OF_ID = 4146719643;
    static className = "DocumentAttributeAudio";
    static classType = "constructor";

    flags!: number;
    voice?: boolean;
    duration!: number;
    title?: string;
    performer?: string;
    waveform?: Buffer;

    constructor(args: { flags?: number, voice?: boolean, duration?: number, title?: string, performer?: string, waveform?: Buffer } = {}) {
        super();
        this.flags = args.flags!;
        this.voice = args.voice;
        this.duration = args.duration!;
        this.title = args.title;
        this.performer = args.performer;
        this.waveform = args.waveform;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2555574726, false);
        let flags = 0;
        if (this.voice) { flags |= 1 << 10; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 0; }
        if (this.performer !== undefined && this.performer !== null) { flags |= 1 << 1; }
        if (this.waveform !== undefined && this.waveform !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.voice !== undefined && this.voice !== null) {
        }
        writer.writeInt(this.duration);
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.performer !== undefined && this.performer !== null) {
            writer.tgWriteString(this.performer);
        }
        if (this.waveform !== undefined && this.waveform !== null) {
            writer.tgWriteBytes(this.waveform);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DocumentAttributeAudio {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 10)) {
            const _voice = true;
            args.voice = _voice;
        } else {
            args.voice = false;
        }
        const _duration = reader.readInt();
        args.duration = _duration;
        if (args.flags & (1 << 0)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _performer = reader.tgReadString();
            args.performer = _performer;
        } else {
            args.performer = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _waveform = reader.tgReadBytes();
            args.waveform = _waveform;
        } else {
            args.waveform = undefined;
        }
        return new DocumentAttributeAudio(args);
    }
}