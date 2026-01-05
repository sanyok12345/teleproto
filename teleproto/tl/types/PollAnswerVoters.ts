import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PollAnswerVoters extends TLObject {
    static CONSTRUCTOR_ID = 997055186;
    static SUBCLASS_OF_ID = 2095107985;
    static className = "PollAnswerVoters";
    static classType = "constructor";

    flags!: number;
    chosen?: boolean;
    correct?: boolean;
    option!: Buffer;
    voters!: number;

    constructor(args: { flags?: number, chosen?: boolean, correct?: boolean, option?: Buffer, voters?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.chosen = args.chosen;
        this.correct = args.correct;
        this.option = args.option!;
        this.voters = args.voters!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(997055186, false);
        let flags = 0;
        if (this.chosen) { flags |= 1 << 0; }
        if (this.correct) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.chosen !== undefined && this.chosen !== null) {
        }
        if (this.correct !== undefined && this.correct !== null) {
        }
        writer.tgWriteBytes(this.option);
        writer.writeInt(this.voters);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PollAnswerVoters {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _chosen = true;
            args.chosen = _chosen;
        } else {
            args.chosen = false;
        }
        if (args.flags & (1 << 1)) {
            const _correct = true;
            args.correct = _correct;
        } else {
            args.correct = false;
        }
        const _option = reader.tgReadBytes();
        args.option = _option;
        const _voters = reader.readInt();
        args.voters = _voters;
        return new PollAnswerVoters(args);
    }
}