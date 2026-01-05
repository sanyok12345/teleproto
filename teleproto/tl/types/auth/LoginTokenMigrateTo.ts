import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class LoginTokenMigrateTo extends TLObject {
    static CONSTRUCTOR_ID = 110008598;
    static SUBCLASS_OF_ID = 1800795702;
    static className = "auth.LoginTokenMigrateTo";
    static classType = "constructor";

    dcId!: number;
    token!: Buffer;

    constructor(args: { dcId?: number, token?: Buffer } = {}) {
        super();
        this.dcId = args.dcId!;
        this.token = args.token!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(110008598, false);
        writer.writeInt(this.dcId);
        writer.tgWriteBytes(this.token);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): LoginTokenMigrateTo {
        const args: any = {};
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        const _token = reader.tgReadBytes();
        args.token = _token;
        return new LoginTokenMigrateTo(args);
    }
}