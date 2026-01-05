import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputWallPaperNoFile extends TLObject {
    static CONSTRUCTOR_ID = 2524595758;
    static SUBCLASS_OF_ID = 4000784410;
    static className = "InputWallPaperNoFile";
    static classType = "constructor";

    id!: bigint;

    constructor(args: { id?: bigint } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2524595758, false);
        writer.writeLargeInt(this.id, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputWallPaperNoFile {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        return new InputWallPaperNoFile(args);
    }
}