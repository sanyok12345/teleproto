import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class PeerColorSet extends TLObject {
    static CONSTRUCTOR_ID = 639736408;
    static SUBCLASS_OF_ID = 298574124;
    static className = "help.PeerColorSet";
    static classType = "constructor";

    colors!: number[];

    constructor(args: { colors?: number[] } = {}) {
        super();
        this.colors = args.colors!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(639736408, false);
        writer.writeVector(this.colors, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerColorSet {
        const args: any = {};
        const _colors = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.colors = _colors;
        return new PeerColorSet(args);
    }
}