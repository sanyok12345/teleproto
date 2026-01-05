import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class LangPackStringPluralized extends TLObject {
    static CONSTRUCTOR_ID = 1816636575;
    static SUBCLASS_OF_ID = 3692534457;
    static className = "LangPackStringPluralized";
    static classType = "constructor";

    flags!: number;
    key!: string;
    zeroValue?: string;
    oneValue?: string;
    twoValue?: string;
    fewValue?: string;
    manyValue?: string;
    otherValue!: string;

    constructor(args: { flags?: number, key?: string, zeroValue?: string, oneValue?: string, twoValue?: string, fewValue?: string, manyValue?: string, otherValue?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.key = args.key!;
        this.zeroValue = args.zeroValue;
        this.oneValue = args.oneValue;
        this.twoValue = args.twoValue;
        this.fewValue = args.fewValue;
        this.manyValue = args.manyValue;
        this.otherValue = args.otherValue!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1816636575, false);
        let flags = 0;
        if (this.zeroValue !== undefined && this.zeroValue !== null) { flags |= 1 << 0; }
        if (this.oneValue !== undefined && this.oneValue !== null) { flags |= 1 << 1; }
        if (this.twoValue !== undefined && this.twoValue !== null) { flags |= 1 << 2; }
        if (this.fewValue !== undefined && this.fewValue !== null) { flags |= 1 << 3; }
        if (this.manyValue !== undefined && this.manyValue !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.key);
        if (this.zeroValue !== undefined && this.zeroValue !== null) {
            writer.tgWriteString(this.zeroValue);
        }
        if (this.oneValue !== undefined && this.oneValue !== null) {
            writer.tgWriteString(this.oneValue);
        }
        if (this.twoValue !== undefined && this.twoValue !== null) {
            writer.tgWriteString(this.twoValue);
        }
        if (this.fewValue !== undefined && this.fewValue !== null) {
            writer.tgWriteString(this.fewValue);
        }
        if (this.manyValue !== undefined && this.manyValue !== null) {
            writer.tgWriteString(this.manyValue);
        }
        writer.tgWriteString(this.otherValue);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): LangPackStringPluralized {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _key = reader.tgReadString();
        args.key = _key;
        if (args.flags & (1 << 0)) {
            const _zeroValue = reader.tgReadString();
            args.zeroValue = _zeroValue;
        } else {
            args.zeroValue = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _oneValue = reader.tgReadString();
            args.oneValue = _oneValue;
        } else {
            args.oneValue = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _twoValue = reader.tgReadString();
            args.twoValue = _twoValue;
        } else {
            args.twoValue = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _fewValue = reader.tgReadString();
            args.fewValue = _fewValue;
        } else {
            args.fewValue = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _manyValue = reader.tgReadString();
            args.manyValue = _manyValue;
        } else {
            args.manyValue = undefined;
        }
        const _otherValue = reader.tgReadString();
        args.otherValue = _otherValue;
        return new LangPackStringPluralized(args);
    }
}