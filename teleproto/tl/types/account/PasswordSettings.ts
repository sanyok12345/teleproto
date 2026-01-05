import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeSecureSecretSettings } from "../TypeSecureSecretSettings";

export class PasswordSettings extends TLObject {
    static CONSTRUCTOR_ID = 2589733861;
    static SUBCLASS_OF_ID = 3527389304;
    static className = "account.PasswordSettings";
    static classType = "constructor";

    flags!: number;
    email?: string;
    secureSettings?: TypeSecureSecretSettings;

    constructor(args: { flags?: number, email?: string, secureSettings?: TypeSecureSecretSettings } = {}) {
        super();
        this.flags = args.flags!;
        this.email = args.email;
        this.secureSettings = args.secureSettings;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2589733861, false);
        let flags = 0;
        if (this.email !== undefined && this.email !== null) { flags |= 1 << 0; }
        if (this.secureSettings !== undefined && this.secureSettings !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.email !== undefined && this.email !== null) {
            writer.tgWriteString(this.email);
        }
        if (this.secureSettings !== undefined && this.secureSettings !== null) {
            writer.write(this.secureSettings.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PasswordSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _email = reader.tgReadString();
            args.email = _email;
        } else {
            args.email = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _secureSettings = reader.tgReadObject();
            args.secureSettings = _secureSettings;
        } else {
            args.secureSettings = undefined;
        }
        return new PasswordSettings(args);
    }
}