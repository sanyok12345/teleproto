import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSecureValueType } from "./TypeSecureValueType";

export class SecureRequiredType extends TLObject {
    static CONSTRUCTOR_ID = 2191366618;
    static SUBCLASS_OF_ID = 2088452618;
    static className = "SecureRequiredType";
    static classType = "constructor";

    flags!: number;
    nativeNames?: boolean;
    selfieRequired?: boolean;
    translationRequired?: boolean;
    type!: TypeSecureValueType;

    constructor(args: { flags?: number, nativeNames?: boolean, selfieRequired?: boolean, translationRequired?: boolean, type?: TypeSecureValueType } = {}) {
        super();
        this.flags = args.flags!;
        this.nativeNames = args.nativeNames;
        this.selfieRequired = args.selfieRequired;
        this.translationRequired = args.translationRequired;
        this.type = args.type!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2191366618, false);
        let flags = 0;
        if (this.nativeNames) { flags |= 1 << 0; }
        if (this.selfieRequired) { flags |= 1 << 1; }
        if (this.translationRequired) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.nativeNames !== undefined && this.nativeNames !== null) {
        }
        if (this.selfieRequired !== undefined && this.selfieRequired !== null) {
        }
        if (this.translationRequired !== undefined && this.translationRequired !== null) {
        }
        writer.write(this.type.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureRequiredType {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _nativeNames = true;
            args.nativeNames = _nativeNames;
        } else {
            args.nativeNames = false;
        }
        if (args.flags & (1 << 1)) {
            const _selfieRequired = true;
            args.selfieRequired = _selfieRequired;
        } else {
            args.selfieRequired = false;
        }
        if (args.flags & (1 << 2)) {
            const _translationRequired = true;
            args.translationRequired = _translationRequired;
        } else {
            args.translationRequired = false;
        }
        const _type = reader.tgReadObject();
        args.type = _type;
        return new SecureRequiredType(args);
    }
}