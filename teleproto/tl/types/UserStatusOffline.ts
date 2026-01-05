import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UserStatusOffline extends TLObject {
    static CONSTRUCTOR_ID = 9203775;
    static SUBCLASS_OF_ID = 1527477310;
    static className = "UserStatusOffline";
    static classType = "constructor";

    wasOnline!: number;

    constructor(args: { wasOnline?: number } = {}) {
        super();
        this.wasOnline = args.wasOnline!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(9203775, false);
        writer.writeInt(this.wasOnline);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UserStatusOffline {
        const args: any = {};
        const _wasOnline = reader.readInt();
        args.wasOnline = _wasOnline;
        return new UserStatusOffline(args);
    }
}