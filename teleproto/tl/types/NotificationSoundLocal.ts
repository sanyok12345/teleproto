import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class NotificationSoundLocal extends TLObject {
    static CONSTRUCTOR_ID = 2198575844;
    static SUBCLASS_OF_ID = 4076201307;
    static className = "NotificationSoundLocal";
    static classType = "constructor";

    title!: string;
    data!: string;

    constructor(args: { title?: string, data?: string } = {}) {
        super();
        this.title = args.title!;
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2198575844, false);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.data);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): NotificationSoundLocal {
        const args: any = {};
        const _title = reader.tgReadString();
        args.title = _title;
        const _data = reader.tgReadString();
        args.data = _data;
        return new NotificationSoundLocal(args);
    }
}