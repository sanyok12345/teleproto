import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGroupCall } from "./TypeInputGroupCall";

export class UpdateDeleteGroupCallMessages extends TLObject {
    static CONSTRUCTOR_ID = 1048963372;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateDeleteGroupCallMessages";
    static classType = "constructor";

    call!: TypeInputGroupCall;
    messages!: number[];

    constructor(args: { call?: TypeInputGroupCall, messages?: number[] } = {}) {
        super();
        this.call = args.call!;
        this.messages = args.messages!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1048963372, false);
        writer.write(this.call.getBytes());
        writer.writeVector(this.messages, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateDeleteGroupCallMessages {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _messages = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.messages = _messages;
        return new UpdateDeleteGroupCallMessages(args);
    }
}