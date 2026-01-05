import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ReactionNotificationsFromAll extends TLObject {
    static CONSTRUCTOR_ID = 1268654752;
    static SUBCLASS_OF_ID = 878672192;
    static className = "ReactionNotificationsFromAll";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1268654752, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReactionNotificationsFromAll {
        const args: any = {};
        return new ReactionNotificationsFromAll(args);
    }
}