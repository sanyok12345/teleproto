import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentCodeTypeSetUpEmailRequired extends TLObject {
    static CONSTRUCTOR_ID = 2773032426;
    static SUBCLASS_OF_ID = 4284159374;
    static className = "auth.SentCodeTypeSetUpEmailRequired";
    static classType = "constructor";

    flags!: number;
    appleSigninAllowed?: boolean;
    googleSigninAllowed?: boolean;

    constructor(args: { flags?: number, appleSigninAllowed?: boolean, googleSigninAllowed?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.appleSigninAllowed = args.appleSigninAllowed;
        this.googleSigninAllowed = args.googleSigninAllowed;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2773032426, false);
        let flags = 0;
        if (this.appleSigninAllowed) { flags |= 1 << 0; }
        if (this.googleSigninAllowed) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.appleSigninAllowed !== undefined && this.appleSigninAllowed !== null) {
        }
        if (this.googleSigninAllowed !== undefined && this.googleSigninAllowed !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCodeTypeSetUpEmailRequired {
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
        return new SentCodeTypeSetUpEmailRequired(args);
    }
}