import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class SetBotCallbackAnswer extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3582923530;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SetBotCallbackAnswer";
    static classType = "request";

    flags?: number;
    alert?: boolean;
    queryId?: bigint;
    message?: string;
    url?: string;
    cacheTime?: number;

    constructor(args: { flags?: number, alert?: boolean, queryId?: bigint, message?: string, url?: string, cacheTime?: number } = {}) {
        super();
        this.flags = args.flags;
        this.alert = args.alert;
        this.queryId = args.queryId;
        this.message = args.message;
        this.url = args.url;
        this.cacheTime = args.cacheTime;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3582923530, false);
        let flags = 0;
        if (this.alert) { flags |= 1 << 1; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 0; }
        if (this.url !== undefined && this.url !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.alert !== undefined && this.alert !== null) {
        }
        writer.writeLargeInt(this.queryId!, 64);
        if (this.message !== undefined && this.message !== null) {
            writer.tgWriteString(this.message);
        }
        if (this.url !== undefined && this.url !== null) {
            writer.tgWriteString(this.url);
        }
        writer.writeInt(this.cacheTime!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetBotCallbackAnswer {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _alert = true;
            args.alert = _alert;
        } else {
            args.alert = false;
        }
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        if (args.flags & (1 << 0)) {
            const _message = reader.tgReadString();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _url = reader.tgReadString();
            args.url = _url;
        } else {
            args.url = undefined;
        }
        const _cacheTime = reader.readInt();
        args.cacheTime = _cacheTime;
        return new SetBotCallbackAnswer(args);
    }
}