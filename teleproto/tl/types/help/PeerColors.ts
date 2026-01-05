import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeerColorOption } from "../help/TypePeerColorOption";

export class PeerColors extends TLObject {
    static CONSTRUCTOR_ID = 16313608;
    static SUBCLASS_OF_ID = 239036211;
    static className = "help.PeerColors";
    static classType = "constructor";

    hash!: number;
    colors!: TypePeerColorOption[];

    constructor(args: { hash?: number, colors?: TypePeerColorOption[] } = {}) {
        super();
        this.hash = args.hash!;
        this.colors = args.colors!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(16313608, false);
        writer.writeInt(this.hash);
        writer.writeVector(this.colors, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerColors {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        const _colors = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.colors = _colors;
        return new PeerColors(args);
    }
}