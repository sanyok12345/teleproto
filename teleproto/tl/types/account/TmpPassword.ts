import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class TmpPassword extends TLObject {
    static CONSTRUCTOR_ID = 3680828724;
    static SUBCLASS_OF_ID = 2959382829;
    static className = "account.TmpPassword";
    static classType = "constructor";

    tmpPassword!: Buffer;
    validUntil!: number;

    constructor(args: { tmpPassword?: Buffer, validUntil?: number } = {}) {
        super();
        this.tmpPassword = args.tmpPassword!;
        this.validUntil = args.validUntil!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3680828724, false);
        writer.tgWriteBytes(this.tmpPassword);
        writer.writeInt(this.validUntil);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TmpPassword {
        const args: any = {};
        const _tmpPassword = reader.tgReadBytes();
        args.tmpPassword = _tmpPassword;
        const _validUntil = reader.readInt();
        args.validUntil = _validUntil;
        return new TmpPassword(args);
    }
}