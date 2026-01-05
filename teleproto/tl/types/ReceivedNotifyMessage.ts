import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ReceivedNotifyMessage extends TLObject {
    static CONSTRUCTOR_ID = 2743383929;
    static SUBCLASS_OF_ID = 2841786398;
    static className = "ReceivedNotifyMessage";
    static classType = "constructor";

    id!: number;
    flags!: number;

    constructor(args: { id?: number, flags?: number } = {}) {
        super();
        this.id = args.id!;
        this.flags = args.flags!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2743383929, false);
        writer.writeInt(this.id);
        writer.writeInt(this.flags);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReceivedNotifyMessage {
        const args: any = {};
        const _id = reader.readInt();
        args.id = _id;
        const _flags = reader.readInt();
        args.flags = _flags;
        return new ReceivedNotifyMessage(args);
    }
}