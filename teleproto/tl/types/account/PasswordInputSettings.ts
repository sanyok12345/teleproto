import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePasswordKdfAlgo } from "../TypePasswordKdfAlgo";
import { TypeSecureSecretSettings } from "../TypeSecureSecretSettings";

export class PasswordInputSettings extends TLObject {
    static CONSTRUCTOR_ID = 3258394569;
    static SUBCLASS_OF_ID = 205679782;
    static className = "account.PasswordInputSettings";
    static classType = "constructor";

    flags!: number;
    newAlgo?: TypePasswordKdfAlgo;
    newPasswordHash?: Buffer;
    hint?: string;
    email?: string;
    newSecureSettings?: TypeSecureSecretSettings;

    constructor(args: { flags?: number, newAlgo?: TypePasswordKdfAlgo, newPasswordHash?: Buffer, hint?: string, email?: string, newSecureSettings?: TypeSecureSecretSettings } = {}) {
        super();
        this.flags = args.flags!;
        this.newAlgo = args.newAlgo;
        this.newPasswordHash = args.newPasswordHash;
        this.hint = args.hint;
        this.email = args.email;
        this.newSecureSettings = args.newSecureSettings;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3258394569, false);
        let flags = 0;
        if (this.newAlgo !== undefined && this.newAlgo !== null) { flags |= 1 << 0; }
        if (this.newPasswordHash !== undefined && this.newPasswordHash !== null) { flags |= 1 << 0; }
        if (this.hint !== undefined && this.hint !== null) { flags |= 1 << 0; }
        if (this.email !== undefined && this.email !== null) { flags |= 1 << 1; }
        if (this.newSecureSettings !== undefined && this.newSecureSettings !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.newAlgo !== undefined && this.newAlgo !== null) {
            writer.write(this.newAlgo.getBytes());
        }
        if (this.newPasswordHash !== undefined && this.newPasswordHash !== null) {
            writer.tgWriteBytes(this.newPasswordHash);
        }
        if (this.hint !== undefined && this.hint !== null) {
            writer.tgWriteString(this.hint);
        }
        if (this.email !== undefined && this.email !== null) {
            writer.tgWriteString(this.email);
        }
        if (this.newSecureSettings !== undefined && this.newSecureSettings !== null) {
            writer.write(this.newSecureSettings.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PasswordInputSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _newAlgo = reader.tgReadObject();
            args.newAlgo = _newAlgo;
        } else {
            args.newAlgo = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _newPasswordHash = reader.tgReadBytes();
            args.newPasswordHash = _newPasswordHash;
        } else {
            args.newPasswordHash = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _hint = reader.tgReadString();
            args.hint = _hint;
        } else {
            args.hint = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _email = reader.tgReadString();
            args.email = _email;
        } else {
            args.email = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _newSecureSettings = reader.tgReadObject();
            args.newSecureSettings = _newSecureSettings;
        } else {
            args.newSecureSettings = undefined;
        }
        return new PasswordInputSettings(args);
    }
}