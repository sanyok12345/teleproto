import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UserStatusOnline extends TLObject {
    static CONSTRUCTOR_ID = 3988339017;
    static SUBCLASS_OF_ID = 1527477310;
    static className = "UserStatusOnline";
    static classType = "constructor";

    expires!: number;

    constructor(args: { expires?: number } = {}) {
        super();
        this.expires = args.expires!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3988339017, false);
        writer.writeInt(this.expires);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UserStatusOnline {
        const args: any = {};
        const _expires = reader.readInt();
        args.expires = _expires;
        return new UserStatusOnline(args);
    }
}