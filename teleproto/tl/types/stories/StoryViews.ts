import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStoryViews } from "../TypeStoryViews";
import { TypeUser } from "../TypeUser";

export class StoryViews extends TLObject {
    static CONSTRUCTOR_ID = 3734957341;
    static SUBCLASS_OF_ID = 1262470330;
    static className = "stories.StoryViews";
    static classType = "constructor";

    views!: TypeStoryViews[];
    users!: TypeUser[];

    constructor(args: { views?: TypeStoryViews[], users?: TypeUser[] } = {}) {
        super();
        this.views = args.views!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3734957341, false);
        writer.writeVector(this.views, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryViews {
        const args: any = {};
        const _views = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.views = _views;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new StoryViews(args);
    }
}