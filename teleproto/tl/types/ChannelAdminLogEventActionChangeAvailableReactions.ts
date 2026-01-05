import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatReactions } from "./TypeChatReactions";

export class ChannelAdminLogEventActionChangeAvailableReactions extends TLObject {
    static CONSTRUCTOR_ID = 3192786680;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionChangeAvailableReactions";
    static classType = "constructor";

    prevValue!: TypeChatReactions;
    newValue!: TypeChatReactions;

    constructor(args: { prevValue?: TypeChatReactions, newValue?: TypeChatReactions } = {}) {
        super();
        this.prevValue = args.prevValue!;
        this.newValue = args.newValue!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3192786680, false);
        writer.write(this.prevValue.getBytes());
        writer.write(this.newValue.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionChangeAvailableReactions {
        const args: any = {};
        const _prevValue = reader.tgReadObject();
        args.prevValue = _prevValue;
        const _newValue = reader.tgReadObject();
        args.newValue = _newValue;
        return new ChannelAdminLogEventActionChangeAvailableReactions(args);
    }
}