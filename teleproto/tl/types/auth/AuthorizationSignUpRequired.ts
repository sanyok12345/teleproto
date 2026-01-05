import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeTermsOfService } from "../help/TypeTermsOfService";

export class AuthorizationSignUpRequired extends TLObject {
    static CONSTRUCTOR_ID = 1148485274;
    static SUBCLASS_OF_ID = 3118485049;
    static className = "auth.AuthorizationSignUpRequired";
    static classType = "constructor";

    flags!: number;
    termsOfService?: TypeTermsOfService;

    constructor(args: { flags?: number, termsOfService?: TypeTermsOfService } = {}) {
        super();
        this.flags = args.flags!;
        this.termsOfService = args.termsOfService;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1148485274, false);
        let flags = 0;
        if (this.termsOfService !== undefined && this.termsOfService !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.termsOfService !== undefined && this.termsOfService !== null) {
            writer.write(this.termsOfService.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AuthorizationSignUpRequired {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _termsOfService = reader.tgReadObject();
            args.termsOfService = _termsOfService;
        } else {
            args.termsOfService = undefined;
        }
        return new AuthorizationSignUpRequired(args);
    }
}