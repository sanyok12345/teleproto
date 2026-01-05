import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessage } from "./TypeMessage";

export class StoryReactionPublicForward extends TLObject {
    static CONSTRUCTOR_ID = 3148555843;
    static SUBCLASS_OF_ID = 3379257259;
    static className = "StoryReactionPublicForward";
    static classType = "constructor";

    message!: TypeMessage;

    constructor(args: { message?: TypeMessage } = {}) {
        super();
        this.message = args.message!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3148555843, false);
        writer.write(this.message.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryReactionPublicForward {
        const args: any = {};
        const _message = reader.tgReadObject();
        args.message = _message;
        return new StoryReactionPublicForward(args);
    }
}