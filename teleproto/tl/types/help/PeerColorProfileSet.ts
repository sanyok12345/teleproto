import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class PeerColorProfileSet extends TLObject {
    static CONSTRUCTOR_ID = 1987928555;
    static SUBCLASS_OF_ID = 298574124;
    static className = "help.PeerColorProfileSet";
    static classType = "constructor";

    paletteColors!: number[];
    bgColors!: number[];
    storyColors!: number[];

    constructor(args: { paletteColors?: number[], bgColors?: number[], storyColors?: number[] } = {}) {
        super();
        this.paletteColors = args.paletteColors!;
        this.bgColors = args.bgColors!;
        this.storyColors = args.storyColors!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1987928555, false);
        writer.writeVector(this.paletteColors, (item) => {
            writer.writeInt(item);
        });
        writer.writeVector(this.bgColors, (item) => {
            writer.writeInt(item);
        });
        writer.writeVector(this.storyColors, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerColorProfileSet {
        const args: any = {};
        const _paletteColors = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.paletteColors = _paletteColors;
        const _bgColors = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.bgColors = _bgColors;
        const _storyColors = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.storyColors = _storyColors;
        return new PeerColorProfileSet(args);
    }
}