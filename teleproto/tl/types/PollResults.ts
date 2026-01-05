import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePollAnswerVoters } from "./TypePollAnswerVoters";
import { TypePeer } from "./TypePeer";
import { TypeMessageEntity } from "./TypeMessageEntity";

export class PollResults extends TLObject {
    static CONSTRUCTOR_ID = 2061444128;
    static SUBCLASS_OF_ID = 3283416711;
    static className = "PollResults";
    static classType = "constructor";

    flags!: number;
    min?: boolean;
    results?: TypePollAnswerVoters[];
    totalVoters?: number;
    recentVoters?: TypePeer[];
    solution?: string;
    solutionEntities?: TypeMessageEntity[];

    constructor(args: { flags?: number, min?: boolean, results?: TypePollAnswerVoters[], totalVoters?: number, recentVoters?: TypePeer[], solution?: string, solutionEntities?: TypeMessageEntity[] } = {}) {
        super();
        this.flags = args.flags!;
        this.min = args.min;
        this.results = args.results;
        this.totalVoters = args.totalVoters;
        this.recentVoters = args.recentVoters;
        this.solution = args.solution;
        this.solutionEntities = args.solutionEntities;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2061444128, false);
        let flags = 0;
        if (this.min) { flags |= 1 << 0; }
        if (this.results !== undefined && this.results !== null) { flags |= 1 << 1; }
        if (this.totalVoters !== undefined && this.totalVoters !== null) { flags |= 1 << 2; }
        if (this.recentVoters !== undefined && this.recentVoters !== null) { flags |= 1 << 3; }
        if (this.solution !== undefined && this.solution !== null) { flags |= 1 << 4; }
        if (this.solutionEntities !== undefined && this.solutionEntities !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.min !== undefined && this.min !== null) {
        }
        if (this.results !== undefined && this.results !== null) {
            writer.writeVector(this.results, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.totalVoters !== undefined && this.totalVoters !== null) {
            writer.writeInt(this.totalVoters);
        }
        if (this.recentVoters !== undefined && this.recentVoters !== null) {
            writer.writeVector(this.recentVoters, (item) => {
                writer.write(item.getBytes());
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

    static fromReader(reader: BinaryReader): PollResults {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _min = true;
            args.min = _min;
        } else {
            args.min = false;
        }
        if (args.flags & (1 << 1)) {
            const _results = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.results = _results;
        } else {
            args.results = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _totalVoters = reader.readInt();
            args.totalVoters = _totalVoters;
        } else {
            args.totalVoters = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _recentVoters = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.recentVoters = _recentVoters;
        } else {
            args.recentVoters = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _solution = reader.tgReadString();
            args.solution = _solution;
        } else {
            args.solution = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _solutionEntities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.solutionEntities = _solutionEntities;
        } else {
            args.solutionEntities = undefined;
        }
        return new PollResults(args);
    }
}