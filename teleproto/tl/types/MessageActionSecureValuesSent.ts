import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSecureValueType } from "./TypeSecureValueType";

export class MessageActionSecureValuesSent extends TLObject {
    static CONSTRUCTOR_ID = 3646710100;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionSecureValuesSent";
    static classType = "constructor";

    types!: TypeSecureValueType[];

    constructor(args: { types?: TypeSecureValueType[] } = {}) {
        super();
        this.types = args.types!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3646710100, false);
        writer.writeVector(this.types, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionSecureValuesSent {
        const args: any = {};
        const _types = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.types = _types;
        return new MessageActionSecureValuesSent(args);
    }
}