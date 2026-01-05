import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSecureRequiredType } from "./TypeSecureRequiredType";

export class SecureRequiredTypeOneOf extends TLObject {
    static CONSTRUCTOR_ID = 41187252;
    static SUBCLASS_OF_ID = 2088452618;
    static className = "SecureRequiredTypeOneOf";
    static classType = "constructor";

    types!: TypeSecureRequiredType[];

    constructor(args: { types?: TypeSecureRequiredType[] } = {}) {
        super();
        this.types = args.types!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(41187252, false);
        writer.writeVector(this.types, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureRequiredTypeOneOf {
        const args: any = {};
        const _types = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.types = _types;
        return new SecureRequiredTypeOneOf(args);
    }
}