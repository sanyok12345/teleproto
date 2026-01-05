import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class LoginToken extends TLObject {
    static CONSTRUCTOR_ID = 1654593920;
    static SUBCLASS_OF_ID = 1800795702;
    static className = "auth.LoginToken";
    static classType = "constructor";

    expires!: number;
    token!: Buffer;

    constructor(args: { expires?: number, token?: Buffer } = {}) {
        super();
        this.expires = args.expires!;
        this.token = args.token!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1654593920, false);
        writer.writeInt(this.expires);
        writer.tgWriteBytes(this.token);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): LoginToken {
        const args: any = {};
        const _expires = reader.readInt();
        args.expires = _expires;
        const _token = reader.tgReadBytes();
        args.token = _token;
        return new LoginToken(args);
    }
}