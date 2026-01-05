import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeSentCodeType } from "../auth/TypeSentCodeType";
import { TypeCodeType } from "../auth/TypeCodeType";

export class SentCode extends TLObject {
    static CONSTRUCTOR_ID = 1577067778;
    static SUBCLASS_OF_ID = 1827172481;
    static className = "auth.SentCode";
    static classType = "constructor";

    flags!: number;
    type!: TypeSentCodeType;
    phoneCodeHash!: string;
    nextType?: TypeCodeType;
    timeout?: number;

    constructor(args: { flags?: number, type?: TypeSentCodeType, phoneCodeHash?: string, nextType?: TypeCodeType, timeout?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.type = args.type!;
        this.phoneCodeHash = args.phoneCodeHash!;
        this.nextType = args.nextType;
        this.timeout = args.timeout;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1577067778, false);
        let flags = 0;
        if (this.nextType !== undefined && this.nextType !== null) { flags |= 1 << 1; }
        if (this.timeout !== undefined && this.timeout !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.write(this.type.getBytes());
        writer.tgWriteString(this.phoneCodeHash);
        if (this.nextType !== undefined && this.nextType !== null) {
            writer.write(this.nextType.getBytes());
        }
        if (this.timeout !== undefined && this.timeout !== null) {
            writer.writeInt(this.timeout);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCode {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _type = reader.tgReadObject();
        args.type = _type;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        if (args.flags & (1 << 1)) {
            const _nextType = reader.tgReadObject();
            args.nextType = _nextType;
        } else {
            args.nextType = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _timeout = reader.readInt();
            args.timeout = _timeout;
        } else {
            args.timeout = undefined;
        }
        return new SentCode(args);
    }
}