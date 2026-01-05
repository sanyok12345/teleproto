import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeHighScore } from "../TypeHighScore";
import { TypeUser } from "../TypeUser";

export class HighScores extends TLObject {
    static CONSTRUCTOR_ID = 2587622809;
    static SUBCLASS_OF_ID = 1825412605;
    static className = "messages.HighScores";
    static classType = "constructor";

    scores!: TypeHighScore[];
    users!: TypeUser[];

    constructor(args: { scores?: TypeHighScore[], users?: TypeUser[] } = {}) {
        super();
        this.scores = args.scores!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2587622809, false);
        writer.writeVector(this.scores, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): HighScores {
        const args: any = {};
        const _scores = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.scores = _scores;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new HighScores(args);
    }
}