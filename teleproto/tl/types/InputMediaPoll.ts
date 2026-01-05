import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePoll } from "./TypePoll";
import { TypeMessageEntity } from "./TypeMessageEntity";

export class InputMediaPoll extends TLObject {
    static CONSTRUCTOR_ID = 261416433;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaPoll";
    static classType = "constructor";

    flags!: number;
    poll!: TypePoll;
    correctAnswers?: Buffer[];
    solution?: string;
    solutionEntities?: TypeMessageEntity[];

    constructor(args: { flags?: number, poll?: TypePoll, correctAnswers?: Buffer[], solution?: string, solutionEntities?: TypeMessageEntity[] } = {}) {
        super();
        this.flags = args.flags!;
        this.poll = args.poll!;
        this.correctAnswers = args.correctAnswers;
        this.solution = args.solution;
        this.solutionEntities = args.solutionEntities;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(261416433, false);
        let flags = 0;
        if (this.correctAnswers !== undefined && this.correctAnswers !== null) { flags |= 1 << 0; }
        if (this.solution !== undefined && this.solution !== null) { flags |= 1 << 1; }
        if (this.solutionEntities !== undefined && this.solutionEntities !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.write(this.poll.getBytes());
        if (this.correctAnswers !== undefined && this.correctAnswers !== null) {
            writer.writeVector(this.correctAnswers, (item) => {
                writer.tgWriteBytes(item);
            });
        }
        if (this.solution !== undefined && this.solution !== null) {
            writer.tgWriteString(this.solution);
        }
        if (this.solutionEntities !== undefined && this.solutionEntities !== null) {
            writer.writeVector(this.solutionEntities, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaPoll {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _poll = reader.tgReadObject();
        args.poll = _poll;
        if (args.flags & (1 << 0)) {
            const _correctAnswers = reader.readVector((reader) => {
                const item = reader.tgReadBytes();
                return item;
            });
            args.correctAnswers = _correctAnswers;
        } else {
            args.correctAnswers = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _solution = reader.tgReadString();
            args.solution = _solution;
        } else {
            args.solution = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _solutionEntities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.solutionEntities = _solutionEntities;
        } else {
            args.solutionEntities = undefined;
        }
        return new InputMediaPoll(args);
    }
}