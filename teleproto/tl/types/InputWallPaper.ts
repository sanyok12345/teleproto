import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputWallPaper extends TLObject {
    static CONSTRUCTOR_ID = 3861952889;
    static SUBCLASS_OF_ID = 4000784410;
    static className = "InputWallPaper";
    static classType = "constructor";

    id!: bigint;
    accessHash!: bigint;

    constructor(args: { id?: bigint, accessHash?: bigint } = {}) {
        super();
        this.id = args.id!;
        this.accessHash = args.accessHash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3861952889, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputWallPaper {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        return new InputWallPaper(args);
    }
}