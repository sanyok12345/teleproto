import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePasswordKdfAlgo } from "../TypePasswordKdfAlgo";
import { TypeSecurePasswordKdfAlgo } from "../TypeSecurePasswordKdfAlgo";

export class Password extends TLObject {
    static CONSTRUCTOR_ID = 2507886843;
    static SUBCLASS_OF_ID = 1403130275;
    static className = "account.Password";
    static classType = "constructor";

    flags!: number;
    hasRecovery?: boolean;
    hasSecureValues?: boolean;
    hasPassword?: boolean;
    currentAlgo?: TypePasswordKdfAlgo;
    srp_B?: Buffer;
    srpId?: bigint;
    hint?: string;
    emailUnconfirmedPattern?: string;
    newAlgo!: TypePasswordKdfAlgo;
    newSecureAlgo!: TypeSecurePasswordKdfAlgo;
    secureRandom!: Buffer;
    pendingResetDate?: number;
    loginEmailPattern?: string;

    constructor(args: { flags?: number, hasRecovery?: boolean, hasSecureValues?: boolean, hasPassword?: boolean, currentAlgo?: TypePasswordKdfAlgo, srp_B?: Buffer, srpId?: bigint, hint?: string, emailUnconfirmedPattern?: string, newAlgo?: TypePasswordKdfAlgo, newSecureAlgo?: TypeSecurePasswordKdfAlgo, secureRandom?: Buffer, pendingResetDate?: number, loginEmailPattern?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.hasRecovery = args.hasRecovery;
        this.hasSecureValues = args.hasSecureValues;
        this.hasPassword = args.hasPassword;
        this.currentAlgo = args.currentAlgo;
        this.srp_B = args.srp_B;
        this.srpId = args.srpId;
        this.hint = args.hint;
        this.emailUnconfirmedPattern = args.emailUnconfirmedPattern;
        this.newAlgo = args.newAlgo!;
        this.newSecureAlgo = args.newSecureAlgo!;
        this.secureRandom = args.secureRandom!;
        this.pendingResetDate = args.pendingResetDate;
        this.loginEmailPattern = args.loginEmailPattern;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2507886843, false);
        let flags = 0;
        if (this.hasRecovery) { flags |= 1 << 0; }
        if (this.hasSecureValues) { flags |= 1 << 1; }
        if (this.hasPassword) { flags |= 1 << 2; }
        if (this.currentAlgo !== undefined && this.currentAlgo !== null) { flags |= 1 << 2; }
        if (this.srp_B !== undefined && this.srp_B !== null) { flags |= 1 << 2; }
        if (this.srpId !== undefined && this.srpId !== null) { flags |= 1 << 2; }
        if (this.hint !== undefined && this.hint !== null) { flags |= 1 << 3; }
        if (this.emailUnconfirmedPattern !== undefined && this.emailUnconfirmedPattern !== null) { flags |= 1 << 4; }
        if (this.pendingResetDate !== undefined && this.pendingResetDate !== null) { flags |= 1 << 5; }
        if (this.loginEmailPattern !== undefined && this.loginEmailPattern !== null) { flags |= 1 << 6; }
        writer.writeInt(flags, false);
        if (this.hasRecovery !== undefined && this.hasRecovery !== null) {
        }
        if (this.hasSecureValues !== undefined && this.hasSecureValues !== null) {
        }
        if (this.hasPassword !== undefined && this.hasPassword !== null) {
        }
        if (this.currentAlgo !== undefined && this.currentAlgo !== null) {
            writer.write(this.currentAlgo.getBytes());
        }
        if (this.srp_B !== undefined && this.srp_B !== null) {
            writer.tgWriteBytes(this.srp_B);
        }
        if (this.srpId !== undefined && this.srpId !== null) {
            writer.writeLargeInt(this.srpId, 64);
        }
        if (this.hint !== undefined && this.hint !== null) {
            writer.tgWriteString(this.hint);
        }
        if (this.emailUnconfirmedPattern !== undefined && this.emailUnconfirmedPattern !== null) {
            writer.tgWriteString(this.emailUnconfirmedPattern);
        }
        writer.write(this.newAlgo.getBytes());
        writer.write(this.newSecureAlgo.getBytes());
        writer.tgWriteBytes(this.secureRandom);
        if (this.pendingResetDate !== undefined && this.pendingResetDate !== null) {
            writer.writeInt(this.pendingResetDate);
        }
        if (this.loginEmailPattern !== undefined && this.loginEmailPattern !== null) {
            writer.tgWriteString(this.loginEmailPattern);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Password {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _hasRecovery = true;
            args.hasRecovery = _hasRecovery;
        } else {
            args.hasRecovery = false;
        }
        if (args.flags & (1 << 1)) {
            const _hasSecureValues = true;
            args.hasSecureValues = _hasSecureValues;
        } else {
            args.hasSecureValues = false;
        }
        if (args.flags & (1 << 2)) {
            const _hasPassword = true;
            args.hasPassword = _hasPassword;
        } else {
            args.hasPassword = false;
        }
        if (args.flags & (1 << 2)) {
            const _currentAlgo = reader.tgReadObject();
            args.currentAlgo = _currentAlgo;
        } else {
            args.currentAlgo = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _srp_B = reader.tgReadBytes();
            args.srp_B = _srp_B;
        } else {
            args.srp_B = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _srpId = reader.readLargeInt(64);
            args.srpId = _srpId;
        } else {
            args.srpId = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _hint = reader.tgReadString();
            args.hint = _hint;
        } else {
            args.hint = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _emailUnconfirmedPattern = reader.tgReadString();
            args.emailUnconfirmedPattern = _emailUnconfirmedPattern;
        } else {
            args.emailUnconfirmedPattern = undefined;
        }
        const _newAlgo = reader.tgReadObject();
        args.newAlgo = _newAlgo;
        const _newSecureAlgo = reader.tgReadObject();
        args.newSecureAlgo = _newSecureAlgo;
        const _secureRandom = reader.tgReadBytes();
        args.secureRandom = _secureRandom;
        if (args.flags & (1 << 5)) {
            const _pendingResetDate = reader.readInt();
            args.pendingResetDate = _pendingResetDate;
        } else {
            args.pendingResetDate = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _loginEmailPattern = reader.tgReadString();
            args.loginEmailPattern = _loginEmailPattern;
        } else {
            args.loginEmailPattern = undefined;
        }
        return new Password(args);
    }
}