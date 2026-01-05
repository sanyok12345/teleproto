import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SavedMusicNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3817310884;
    static SUBCLASS_OF_ID = 4162039351;
    static className = "users.SavedMusicNotModified";
    static classType = "constructor";

    count!: number;

    constructor(args: { count?: number } = {}) {
        super();
        this.count = args.count!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3817310884, false);
        writer.writeInt(this.count);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedMusicNotModified {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        return new SavedMusicNotModified(args);
    }
}