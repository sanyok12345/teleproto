import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeSecureRequiredType } from "../TypeSecureRequiredType";
import { TypeSecureValue } from "../TypeSecureValue";
import { TypeSecureValueError } from "../TypeSecureValueError";
import { TypeUser } from "../TypeUser";

export class AuthorizationForm extends TLObject {
    static CONSTRUCTOR_ID = 2905480408;
    static SUBCLASS_OF_ID = 2013567636;
    static className = "account.AuthorizationForm";
    static classType = "constructor";

    flags!: number;
    requiredTypes!: TypeSecureRequiredType[];
    values!: TypeSecureValue[];
    errors!: TypeSecureValueError[];
    users!: TypeUser[];
    privacyPolicyUrl?: string;

    constructor(args: { flags?: number, requiredTypes?: TypeSecureRequiredType[], values?: TypeSecureValue[], errors?: TypeSecureValueError[], users?: TypeUser[], privacyPolicyUrl?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.requiredTypes = args.requiredTypes!;
        this.values = args.values!;
        this.errors = args.errors!;
        this.users = args.users!;
        this.privacyPolicyUrl = args.privacyPolicyUrl;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2905480408, false);
        let flags = 0;
        if (this.privacyPolicyUrl !== undefined && this.privacyPolicyUrl !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeVector(this.requiredTypes, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.values, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.errors, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        if (this.privacyPolicyUrl !== undefined && this.privacyPolicyUrl !== null) {
            writer.tgWriteString(this.privacyPolicyUrl);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AuthorizationForm {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _requiredTypes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.requiredTypes = _requiredTypes;
        const _values = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.values = _values;
        const _errors = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.errors = _errors;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        if (args.flags & (1 << 0)) {
            const _privacyPolicyUrl = reader.tgReadString();
            args.privacyPolicyUrl = _privacyPolicyUrl;
        } else {
            args.privacyPolicyUrl = undefined;
        }
        return new AuthorizationForm(args);
    }
}