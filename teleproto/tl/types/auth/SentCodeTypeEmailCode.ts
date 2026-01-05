import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentCodeTypeEmailCode extends TLObject {
    static CONSTRUCTOR_ID = 4098946459;
    static SUBCLASS_OF_ID = 4284159374;
    static className = "auth.SentCodeTypeEmailCode";
    static classType = "constructor";

    flags!: number;
    appleSigninAllowed?: boolean;
    googleSigninAllowed?: boolean;
    emailPattern!: string;
    length!: number;
    resetAvailablePeriod?: number;
    resetPendingDate?: number;

    constructor(args: { flags?: number, appleSigninAllowed?: boolean, googleSigninAllowed?: boolean, emailPattern?: string, length?: number, resetAvailablePeriod?: number, resetPendingDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.appleSigninAllowed = args.appleSigninAllowed;
        this.googleSigninAllowed = args.googleSigninAllowed;
        this.emailPattern = args.emailPattern!;
        this.length = args.length!;
        this.resetAvailablePeriod = args.resetAvailablePeriod;
        this.resetPendingDate = args.resetPendingDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4098946459, false);
        let flags = 0;
        if (this.appleSigninAllowed) { flags |= 1 << 0; }
        if (this.googleSigninAllowed) { flags |= 1 << 1; }
        if (this.resetAvailablePeriod !== undefined && this.resetAvailablePeriod !== null) { flags |= 1 << 3; }
        if (this.resetPendingDate !== undefined && this.resetPendingDate !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.appleSigninAllowed !== undefined && this.appleSigninAllowed !== null) {
        }
        if (this.googleSigninAllowed !== undefined && this.googleSigninAllowed !== null) {
        }
        writer.tgWriteString(this.emailPattern);
        writer.writeInt(this.length);
        if (this.resetAvailablePeriod !== undefined && this.resetAvailablePeriod !== null) {
            writer.writeInt(this.resetAvailablePeriod);
        }
        if (this.resetPendingDate !== undefined && this.resetPendingDate !== null) {
            writer.writeInt(this.resetPendingDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCodeTypeEmailCode {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _appleSigninAllowed = true;
            args.appleSigninAllowed = _appleSigninAllowed;
        } else {
            args.appleSigninAllowed = false;
        }
        if (args.flags & (1 << 1)) {
            const _googleSigninAllowed = true;
            args.googleSigninAllowed = _googleSigninAllowed;
        } else {
            args.googleSigninAllowed = false;
        }
        const _emailPattern = reader.tgReadString();
        args.emailPattern = _emailPattern;
        const _length = reader.readInt();
        args.length = _length;
        if (args.flags & (1 << 3)) {
            const _resetAvailablePeriod = reader.readInt();
            args.resetAvailablePeriod = _resetAvailablePeriod;
        } else {
            args.resetAvailablePeriod = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _resetPendingDate = reader.readInt();
            args.resetPendingDate = _resetPendingDate;
        } else {
            args.resetPendingDate = undefined;
        }
        return new SentCodeTypeEmailCode(args);
    }
}