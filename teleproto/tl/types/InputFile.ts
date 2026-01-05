import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputFile extends TLObject {
    static CONSTRUCTOR_ID = 4113560191;
    static SUBCLASS_OF_ID = 3882180383;
    static className = "InputFile";
    static classType = "constructor";

    id!: bigint;
    parts!: number;
    name!: string;
    md5Checksum!: string;

    constructor(args: { id?: bigint, parts?: number, name?: string, md5Checksum?: string } = {}) {
        super();
        this.id = args.id!;
        this.parts = args.parts!;
        this.name = args.name!;
        this.md5Checksum = args.md5Checksum!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4113560191, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeInt(this.parts);
        writer.tgWriteString(this.name);
        writer.tgWriteString(this.md5Checksum);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputFile {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _parts = reader.readInt();
        args.parts = _parts;
        const _name = reader.tgReadString();
        args.name = _name;
        const _md5Checksum = reader.tgReadString();
        args.md5Checksum = _md5Checksum;
        return new InputFile(args);
    }
}