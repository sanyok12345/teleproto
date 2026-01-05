import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeUpdate } from "./TypeUpdate";

export class UpdateShort extends TLObject {
    static CONSTRUCTOR_ID = 2027216577;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "UpdateShort";
    static classType = "constructor";

    update!: TypeUpdate;
    date!: number;

    constructor(args: { update?: TypeUpdate, date?: number } = {}) {
        super();
        this.update = args.update!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2027216577, false);
        writer.write(this.update.getBytes());
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateShort {
        const args: any = {};
        const _update = reader.tgReadObject();
        args.update = _update;
        const _date = reader.readInt();
        args.date = _date;
        return new UpdateShort(args);
    }
}