import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDocument } from "../TypeDocument";

export class SavedRingtones extends TLObject {
    static CONSTRUCTOR_ID = 3253284037;
    static SUBCLASS_OF_ID = 666683742;
    static className = "account.SavedRingtones";
    static classType = "constructor";

    hash!: bigint;
    ringtones!: TypeDocument[];

    constructor(args: { hash?: bigint, ringtones?: TypeDocument[] } = {}) {
        super();
        this.hash = args.hash!;
        this.ringtones = args.ringtones!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3253284037, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.ringtones, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedRingtones {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _ringtones = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.ringtones = _ringtones;
        return new SavedRingtones(args);
    }
}