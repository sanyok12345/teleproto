import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class RequestFirebaseSms extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2386109982;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "auth.RequestFirebaseSms";
    static classType = "request";

    flags?: number;
    phoneNumber?: string;
    phoneCodeHash?: string;
    safetyNetToken?: string;
    playIntegrityToken?: string;
    iosPushSecret?: string;

    constructor(args: { flags?: number, phoneNumber?: string, phoneCodeHash?: string, safetyNetToken?: string, playIntegrityToken?: string, iosPushSecret?: string } = {}) {
        super();
        this.flags = args.flags;
        this.phoneNumber = args.phoneNumber;
        this.phoneCodeHash = args.phoneCodeHash;
        this.safetyNetToken = args.safetyNetToken;
        this.playIntegrityToken = args.playIntegrityToken;
        this.iosPushSecret = args.iosPushSecret;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2386109982, false);
        let flags = 0;
        if (this.safetyNetToken !== undefined && this.safetyNetToken !== null) { flags |= 1 << 0; }
        if (this.playIntegrityToken !== undefined && this.playIntegrityToken !== null) { flags |= 1 << 2; }
        if (this.iosPushSecret !== undefined && this.iosPushSecret !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.phoneNumber!);
        writer.tgWriteString(this.phoneCodeHash!);
        if (this.safetyNetToken !== undefined && this.safetyNetToken !== null) {
            writer.tgWriteString(this.safetyNetToken);
        }
        if (this.playIntegrityToken !== undefined && this.playIntegrityToken !== null) {
            writer.tgWriteString(this.playIntegrityToken);
        }
        if (this.iosPushSecret !== undefined && this.iosPushSecret !== null) {
            writer.tgWriteString(this.iosPushSecret);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RequestFirebaseSms {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        if (args.flags & (1 << 0)) {
            const _safetyNetToken = reader.tgReadString();
            args.safetyNetToken = _safetyNetToken;
        } else {
            args.safetyNetToken = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _playIntegrityToken = reader.tgReadString();
            args.playIntegrityToken = _playIntegrityToken;
        } else {
            args.playIntegrityToken = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _iosPushSecret = reader.tgReadString();
            args.iosPushSecret = _iosPushSecret;
        } else {
            args.iosPushSecret = undefined;
        }
        return new RequestFirebaseSms(args);
    }
}