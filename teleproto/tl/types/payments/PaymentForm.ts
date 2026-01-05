import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeWebDocument } from "../TypeWebDocument";
import { TypeInvoice } from "../TypeInvoice";
import { TypeDataJSON } from "../TypeDataJSON";
import { TypePaymentFormMethod } from "../TypePaymentFormMethod";
import { TypePaymentRequestedInfo } from "../TypePaymentRequestedInfo";
import { TypePaymentSavedCredentials } from "../TypePaymentSavedCredentials";
import { TypeUser } from "../TypeUser";

export class PaymentForm extends TLObject {
    static CONSTRUCTOR_ID = 2684716881;
    static SUBCLASS_OF_ID = 2689089305;
    static className = "payments.PaymentForm";
    static classType = "constructor";

    flags!: number;
    canSaveCredentials?: boolean;
    passwordMissing?: boolean;
    formId!: bigint;
    botId!: bigint;
    title!: string;
    description!: string;
    photo?: TypeWebDocument;
    invoice!: TypeInvoice;
    providerId!: bigint;
    url!: string;
    nativeProvider?: string;
    nativeParams?: TypeDataJSON;
    additionalMethods?: TypePaymentFormMethod[];
    savedInfo?: TypePaymentRequestedInfo;
    savedCredentials?: TypePaymentSavedCredentials[];
    users!: TypeUser[];

    constructor(args: { flags?: number, canSaveCredentials?: boolean, passwordMissing?: boolean, formId?: bigint, botId?: bigint, title?: string, description?: string, photo?: TypeWebDocument, invoice?: TypeInvoice, providerId?: bigint, url?: string, nativeProvider?: string, nativeParams?: TypeDataJSON, additionalMethods?: TypePaymentFormMethod[], savedInfo?: TypePaymentRequestedInfo, savedCredentials?: TypePaymentSavedCredentials[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.canSaveCredentials = args.canSaveCredentials;
        this.passwordMissing = args.passwordMissing;
        this.formId = args.formId!;
        this.botId = args.botId!;
        this.title = args.title!;
        this.description = args.description!;
        this.photo = args.photo;
        this.invoice = args.invoice!;
        this.providerId = args.providerId!;
        this.url = args.url!;
        this.nativeProvider = args.nativeProvider;
        this.nativeParams = args.nativeParams;
        this.additionalMethods = args.additionalMethods;
        this.savedInfo = args.savedInfo;
        this.savedCredentials = args.savedCredentials;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2684716881, false);
        let flags = 0;
        if (this.canSaveCredentials) { flags |= 1 << 2; }
        if (this.passwordMissing) { flags |= 1 << 3; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 5; }
        if (this.nativeProvider !== undefined && this.nativeProvider !== null) { flags |= 1 << 4; }
        if (this.nativeParams !== undefined && this.nativeParams !== null) { flags |= 1 << 4; }
        if (this.additionalMethods !== undefined && this.additionalMethods !== null) { flags |= 1 << 6; }
        if (this.savedInfo !== undefined && this.savedInfo !== null) { flags |= 1 << 0; }
        if (this.savedCredentials !== undefined && this.savedCredentials !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.canSaveCredentials !== undefined && this.canSaveCredentials !== null) {
        }
        if (this.passwordMissing !== undefined && this.passwordMissing !== null) {
        }
        writer.writeLargeInt(this.formId, 64);
        writer.writeLargeInt(this.botId, 64);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.description);
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        writer.write(this.invoice.getBytes());
        writer.writeLargeInt(this.providerId, 64);
        writer.tgWriteString(this.url);
        if (this.nativeProvider !== undefined && this.nativeProvider !== null) {
            writer.tgWriteString(this.nativeProvider);
        }
        if (this.nativeParams !== undefined && this.nativeParams !== null) {
            writer.write(this.nativeParams.getBytes());
        }
        if (this.additionalMethods !== undefined && this.additionalMethods !== null) {
            writer.writeVector(this.additionalMethods, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.savedInfo !== undefined && this.savedInfo !== null) {
            writer.write(this.savedInfo.getBytes());
        }
        if (this.savedCredentials !== undefined && this.savedCredentials !== null) {
            writer.writeVector(this.savedCredentials, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaymentForm {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _canSaveCredentials = true;
            args.canSaveCredentials = _canSaveCredentials;
        } else {
            args.canSaveCredentials = false;
        }
        if (args.flags & (1 << 3)) {
            const _passwordMissing = true;
            args.passwordMissing = _passwordMissing;
        } else {
            args.passwordMissing = false;
        }
        const _formId = reader.readLargeInt(64);
        args.formId = _formId;
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _title = reader.tgReadString();
        args.title = _title;
        const _description = reader.tgReadString();
        args.description = _description;
        if (args.flags & (1 << 5)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        const _invoice = reader.tgReadObject();
        args.invoice = _invoice;
        const _providerId = reader.readLargeInt(64);
        args.providerId = _providerId;
        const _url = reader.tgReadString();
        args.url = _url;
        if (args.flags & (1 << 4)) {
            const _nativeProvider = reader.tgReadString();
            args.nativeProvider = _nativeProvider;
        } else {
            args.nativeProvider = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _nativeParams = reader.tgReadObject();
            args.nativeParams = _nativeParams;
        } else {
            args.nativeParams = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _additionalMethods = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.additionalMethods = _additionalMethods;
        } else {
            args.additionalMethods = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _savedInfo = reader.tgReadObject();
            args.savedInfo = _savedInfo;
        } else {
            args.savedInfo = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _savedCredentials = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.savedCredentials = _savedCredentials;
        } else {
            args.savedCredentials = undefined;
        }
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new PaymentForm(args);
    }
}