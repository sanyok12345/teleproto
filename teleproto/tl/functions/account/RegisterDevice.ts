import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class RegisterDevice extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3968205178;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.RegisterDevice";
    static classType = "request";

    flags?: number;
    noMuted?: boolean;
    tokenType!: number;
    token!: string;
    appSandbox!: boolean;
    secret!: Buffer;
    otherUids!: bigint[];

    constructor(args: { flags?: number, noMuted?: boolean, tokenType?: number, token?: string, appSandbox?: boolean, secret?: Buffer, otherUids?: bigint[] } = {}) {
        super();
        this.flags = args.flags;
        this.noMuted = args.noMuted;
        this.tokenType = args.tokenType!;
        this.token = args.token!;
        this.appSandbox = args.appSandbox!;
        this.secret = args.secret!;
        this.otherUids = args.otherUids!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3968205178, false);
        let flags = 0;
        if (this.noMuted) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.noMuted !== undefined && this.noMuted !== null) {
        }
        writer.writeInt(this.tokenType);
        writer.tgWriteString(this.token);
        writer.tgWriteBool(this.appSandbox);
        writer.tgWriteBytes(this.secret);
        writer.writeVector(this.otherUids, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RegisterDevice {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _noMuted = true;
            args.noMuted = _noMuted;
        } else {
            args.noMuted = false;
        }
        const _tokenType = reader.readInt();
        args.tokenType = _tokenType;
        const _token = reader.tgReadString();
        args.token = _token;
        const _appSandbox = reader.tgReadBool();
        args.appSandbox = _appSandbox;
        const _secret = reader.tgReadBytes();
        args.secret = _secret;
        const _otherUids = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.otherUids = _otherUids;
        return new RegisterDevice(args);
    }
}