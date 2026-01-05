import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeEmojiGroup } from "../TypeEmojiGroup";

export class EmojiGroups extends TLObject {
    static CONSTRUCTOR_ID = 2283780427;
    static SUBCLASS_OF_ID = 2127189465;
    static className = "messages.EmojiGroups";
    static classType = "constructor";

    hash!: number;
    groups!: TypeEmojiGroup[];

    constructor(args: { hash?: number, groups?: TypeEmojiGroup[] } = {}) {
        super();
        this.hash = args.hash!;
        this.groups = args.groups!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2283780427, false);
        writer.writeInt(this.hash);
        writer.writeVector(this.groups, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiGroups {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        const _groups = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.groups = _groups;
        return new EmojiGroups(args);
    }
}