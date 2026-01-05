import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";
import { TypeInputClientProxy } from "../types/TypeInputClientProxy";
import { TypeJSONValue } from "../types/TypeJSONValue";

export class InitConnection extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3251461801;
    static SUBCLASS_OF_ID = 3081909835;
    static className = "InitConnection";
    static classType = "request";

    flags?: number;
    apiId!: number;
    deviceModel!: string;
    systemVersion!: string;
    appVersion!: string;
    systemLangCode?: string;
    langPack!: string;
    langCode?: string;
    proxy?: TypeInputClientProxy;
    params?: TypeJSONValue;
    query?: any;

    constructor(args: { flags?: number, apiId?: number, deviceModel?: string, systemVersion?: string, appVersion?: string, systemLangCode?: string, langPack?: string, langCode?: string, proxy?: TypeInputClientProxy, params?: TypeJSONValue, query?: any } = {}) {
        super();
        this.flags = args.flags;
        this.apiId = args.apiId!;
        this.deviceModel = args.deviceModel!;
        this.systemVersion = args.systemVersion!;
        this.appVersion = args.appVersion!;
        this.systemLangCode = args.systemLangCode;
        this.langPack = args.langPack!;
        this.langCode = args.langCode;
        this.proxy = args.proxy;
        this.params = args.params;
        this.query = args.query;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3251461801, false);
        let flags = 0;
        if (this.proxy !== undefined && this.proxy !== null) { flags |= 1 << 0; }
        if (this.params !== undefined && this.params !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeInt(this.apiId);
        writer.tgWriteString(this.deviceModel);
        writer.tgWriteString(this.systemVersion);
        writer.tgWriteString(this.appVersion);
        writer.tgWriteString(this.systemLangCode!);
        writer.tgWriteString(this.langPack);
        writer.tgWriteString(this.langCode!);
        if (this.proxy !== undefined && this.proxy !== null) {
            writer.write(this.proxy.getBytes());
        }
        if (this.params !== undefined && this.params !== null) {
            writer.write(this.params.getBytes());
        }
        writer.write(this.query!.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): any {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InitConnection {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _apiId = reader.readInt();
        args.apiId = _apiId;
        const _deviceModel = reader.tgReadString();
        args.deviceModel = _deviceModel;
        const _systemVersion = reader.tgReadString();
        args.systemVersion = _systemVersion;
        const _appVersion = reader.tgReadString();
        args.appVersion = _appVersion;
        const _systemLangCode = reader.tgReadString();
        args.systemLangCode = _systemLangCode;
        const _langPack = reader.tgReadString();
        args.langPack = _langPack;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        if (args.flags & (1 << 0)) {
            const _proxy = reader.tgReadObject();
            args.proxy = _proxy;
        } else {
            args.proxy = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _params = reader.tgReadObject();
            args.params = _params;
        } else {
            args.params = undefined;
        }
        const _query = reader.tgReadObject();
        args.query = _query;
        return new InitConnection(args);
    }
}