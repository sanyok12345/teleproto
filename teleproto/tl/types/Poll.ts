import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTextWithEntities } from "./TypeTextWithEntities";
import { TypePollAnswer } from "./TypePollAnswer";

export class Poll extends TLObject {
    static CONSTRUCTOR_ID = 1484026161;
    static SUBCLASS_OF_ID = 613307771;
    static className = "Poll";
    static classType = "constructor";

    id!: bigint;
    flags!: number;
    closed?: boolean;
    publicVoters?: boolean;
    multipleChoice?: boolean;
    quiz?: boolean;
    question!: TypeTextWithEntities;
    answers!: TypePollAnswer[];
    closePeriod?: number;
    closeDate?: number;

    constructor(args: { id?: bigint, flags?: number, closed?: boolean, publicVoters?: boolean, multipleChoice?: boolean, quiz?: boolean, question?: TypeTextWithEntities, answers?: TypePollAnswer[], closePeriod?: number, closeDate?: number } = {}) {
        super();
        this.id = args.id!;
        this.flags = args.flags!;
        this.closed = args.closed;
        this.publicVoters = args.publicVoters;
        this.multipleChoice = args.multipleChoice;
        this.quiz = args.quiz;
        this.question = args.question!;
        this.answers = args.answers!;
        this.closePeriod = args.closePeriod;
        this.closeDate = args.closeDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1484026161, false);
        let flags = 0;
        if (this.closed) { flags |= 1 << 0; }
        if (this.publicVoters) { flags |= 1 << 1; }
        if (this.multipleChoice) { flags |= 1 << 2; }
        if (this.quiz) { flags |= 1 << 3; }
        if (this.closePeriod !== undefined && this.closePeriod !== null) { flags |= 1 << 4; }
        if (this.closeDate !== undefined && this.closeDate !== null) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.id, 64);
        if (this.closed !== undefined && this.closed !== null) {
        }
        if (this.publicVoters !== undefined && this.publicVoters !== null) {
        }
        if (this.multipleChoice !== undefined && this.multipleChoice !== null) {
        }
        if (this.quiz !== undefined && this.quiz !== null) {
        }
        writer.write(this.question.getBytes());
        writer.writeVector(this.answers, (item) => {
            writer.write(item.getBytes());
        });
        if (this.closePeriod !== undefined && this.closePeriod !== null) {
            writer.writeInt(this.closePeriod);
        }
        if (this.closeDate !== undefined && this.closeDate !== null) {
            writer.writeInt(this.closeDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Poll {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _closed = true;
            args.closed = _closed;
        } else {
            args.closed = false;
        }
        if (args.flags & (1 << 1)) {
            const _publicVoters = true;
            args.publicVoters = _publicVoters;
        } else {
            args.publicVoters = false;
        }
        if (args.flags & (1 << 2)) {
            const _multipleChoice = true;
            args.multipleChoice = _multipleChoice;
        } else {
            args.multipleChoice = false;
        }
        if (args.flags & (1 << 3)) {
            const _quiz = true;
            args.quiz = _quiz;
        } else {
            args.quiz = false;
        }
        const _question = reader.tgReadObject();
        args.question = _question;
        const _answers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.answers = _answers;
        if (args.flags & (1 << 4)) {
            const _closePeriod = reader.readInt();
            args.closePeriod = _closePeriod;
        } else {
            args.closePeriod = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _closeDate = reader.readInt();
            args.closeDate = _closeDate;
        } else {
            args.closeDate = undefined;
        }
        return new Poll(args);
    }
}