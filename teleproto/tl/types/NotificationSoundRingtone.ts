import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class NotificationSoundRingtone extends TLObject {
    static CONSTRUCTOR_ID = 4285300809;
    static SUBCLASS_OF_ID = 4076201307;
    static className = "NotificationSoundRingtone";
    static classType = "constructor";

    id!: bigint;

    constructor(args: { id?: bigint } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4285300809, false);
        writer.writeLargeInt(this.id, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): NotificationSoundRingtone {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        return new NotificationSoundRingtone(args);
    }
}