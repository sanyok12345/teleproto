import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class RequirementToContactEmpty extends TLObject {
    static CONSTRUCTOR_ID = 84580409;
    static SUBCLASS_OF_ID = 2373280657;
    static className = "RequirementToContactEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(84580409, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RequirementToContactEmpty {
        const args: any = {};
        return new RequirementToContactEmpty(args);
    }
}