import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class WebAuthorization extends TLObject {
    static CONSTRUCTOR_ID = 2801333330;
    static SUBCLASS_OF_ID = 58084656;
    static className = "WebAuthorization";
    static classType = "constructor";

    hash!: bigint;
    botId!: bigint;
    domain!: string;
    browser!: string;
    platform!: string;
    dateCreated!: number;
    dateActive!: number;
    ip!: string;
    region!: string;

    constructor(args: { hash?: bigint, botId?: bigint, domain?: string, browser?: string, platform?: string, dateCreated?: number, dateActive?: number, ip?: string, region?: string } = {}) {
        super();
        this.hash = args.hash!;
        this.botId = args.botId!;
        this.domain = args.domain!;
        this.browser = args.browser!;
        this.platform = args.platform!;
        this.dateCreated = args.dateCreated!;
        this.dateActive = args.dateActive!;
        this.ip = args.ip!;
        this.region = args.region!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2801333330, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeLargeInt(this.botId, 64);
        writer.tgWriteString(this.domain);
        writer.tgWriteString(this.browser);
        writer.tgWriteString(this.platform);
        writer.writeInt(this.dateCreated);
        writer.writeInt(this.dateActive);
        writer.tgWriteString(this.ip);
        writer.tgWriteString(this.region);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebAuthorization {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _domain = reader.tgReadString();
        args.domain = _domain;
        const _browser = reader.tgReadString();
        args.browser = _browser;
        const _platform = reader.tgReadString();
        args.platform = _platform;
        const _dateCreated = reader.readInt();
        args.dateCreated = _dateCreated;
        const _dateActive = reader.readInt();
        args.dateActive = _dateActive;
        const _ip = reader.tgReadString();
        args.ip = _ip;
        const _region = reader.tgReadString();
        args.region = _region;
        return new WebAuthorization(args);
    }
}