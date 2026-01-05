import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class UnregisterDevice extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1779249670;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.UnregisterDevice";
    static classType = "request";

    tokenType!: number;
    token!: string;
    otherUids!: bigint[];

    constructor(args: { tokenType?: number, token?: string, otherUids?: bigint[] } = {}) {
        super();
        this.tokenType = args.tokenType!;
        this.token = args.token!;
        this.otherUids = args.otherUids!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1779249670, false);
        writer.writeInt(this.tokenType);
        writer.tgWriteString(this.token);
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

    static fromReader(reader: BinaryReader): UnregisterDevice {
        const args: any = {};
        const _tokenType = reader.readInt();
        args.tokenType = _tokenType;
        const _token = reader.tgReadString();
        args.token = _token;
        const _otherUids = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.otherUids = _otherUids;
        return new UnregisterDevice(args);
    }
}