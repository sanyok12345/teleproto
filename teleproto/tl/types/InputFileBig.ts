import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputFileBig extends TLObject {
    static CONSTRUCTOR_ID = 4199484341;
    static SUBCLASS_OF_ID = 3882180383;
    static className = "InputFileBig";
    static classType = "constructor";

    id!: bigint;
    parts!: number;
    name!: string;

    constructor(args: { id?: bigint, parts?: number, name?: string } = {}) {
        super();
        this.id = args.id!;
        this.parts = args.parts!;
        this.name = args.name!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4199484341, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeInt(this.parts);
        writer.tgWriteString(this.name);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputFileBig {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _parts = reader.readInt();
        args.parts = _parts;
        const _name = reader.tgReadString();
        args.name = _name;
        return new InputFileBig(args);
    }
}