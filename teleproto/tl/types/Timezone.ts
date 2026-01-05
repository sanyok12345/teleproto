import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class Timezone extends TLObject {
    static CONSTRUCTOR_ID = 4287793653;
    static SUBCLASS_OF_ID = 3463958721;
    static className = "Timezone";
    static classType = "constructor";

    id!: string;
    name!: string;
    utcOffset!: number;

    constructor(args: { id?: string, name?: string, utcOffset?: number } = {}) {
        super();
        this.id = args.id!;
        this.name = args.name!;
        this.utcOffset = args.utcOffset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4287793653, false);
        writer.tgWriteString(this.id);
        writer.tgWriteString(this.name);
        writer.writeInt(this.utcOffset);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Timezone {
        const args: any = {};
        const _id = reader.tgReadString();
        args.id = _id;
        const _name = reader.tgReadString();
        args.name = _name;
        const _utcOffset = reader.readInt();
        args.utcOffset = _utcOffset;
        return new Timezone(args);
    }
}