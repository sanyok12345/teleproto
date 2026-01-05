import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeEmojiStatus } from "./TypeEmojiStatus";

export class ChannelAdminLogEventActionChangeEmojiStatus extends TLObject {
    static CONSTRUCTOR_ID = 1051328177;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionChangeEmojiStatus";
    static classType = "constructor";

    prevValue!: TypeEmojiStatus;
    newValue!: TypeEmojiStatus;

    constructor(args: { prevValue?: TypeEmojiStatus, newValue?: TypeEmojiStatus } = {}) {
        super();
        this.prevValue = args.prevValue!;
        this.newValue = args.newValue!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1051328177, false);
        writer.write(this.prevValue.getBytes());
        writer.write(this.newValue.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionChangeEmojiStatus {
        const args: any = {};
        const _prevValue = reader.tgReadObject();
        args.prevValue = _prevValue;
        const _newValue = reader.tgReadObject();
        args.newValue = _newValue;
        return new ChannelAdminLogEventActionChangeEmojiStatus(args);
    }
}