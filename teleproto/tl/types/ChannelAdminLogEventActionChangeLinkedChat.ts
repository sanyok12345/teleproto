import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelAdminLogEventActionChangeLinkedChat extends TLObject {
    static CONSTRUCTOR_ID = 84703944;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionChangeLinkedChat";
    static classType = "constructor";

    prevValue!: bigint;
    newValue!: bigint;

    constructor(args: { prevValue?: bigint, newValue?: bigint } = {}) {
        super();
        this.prevValue = args.prevValue!;
        this.newValue = args.newValue!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(84703944, false);
        writer.writeLargeInt(this.prevValue, 64);
        writer.writeLargeInt(this.newValue, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionChangeLinkedChat {
        const args: any = {};
        const _prevValue = reader.readLargeInt(64);
        args.prevValue = _prevValue;
        const _newValue = reader.readLargeInt(64);
        args.newValue = _newValue;
        return new ChannelAdminLogEventActionChangeLinkedChat(args);
    }
}