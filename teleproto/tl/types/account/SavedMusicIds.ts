import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SavedMusicIds extends TLObject {
    static CONSTRUCTOR_ID = 2576180790;
    static SUBCLASS_OF_ID = 1263203986;
    static className = "account.SavedMusicIds";
    static classType = "constructor";

    ids!: bigint[];

    constructor(args: { ids?: bigint[] } = {}) {
        super();
        this.ids = args.ids!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2576180790, false);
        writer.writeVector(this.ids, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedMusicIds {
        const args: any = {};
        const _ids = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.ids = _ids;
        return new SavedMusicIds(args);
    }
}