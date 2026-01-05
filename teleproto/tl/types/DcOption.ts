import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DcOption extends TLObject {
    static CONSTRUCTOR_ID = 414687501;
    static SUBCLASS_OF_ID = 2655248675;
    static className = "DcOption";
    static classType = "constructor";

    flags!: number;
    ipv6?: boolean;
    mediaOnly?: boolean;
    tcpoOnly?: boolean;
    cdn?: boolean;
    static?: boolean;
    thisPortOnly?: boolean;
    id!: number;
    ipAddress!: string;
    port!: number;
    secret?: Buffer;

    constructor(args: { flags?: number, ipv6?: boolean, mediaOnly?: boolean, tcpoOnly?: boolean, cdn?: boolean, static?: boolean, thisPortOnly?: boolean, id?: number, ipAddress?: string, port?: number, secret?: Buffer } = {}) {
        super();
        this.flags = args.flags!;
        this.ipv6 = args.ipv6;
        this.mediaOnly = args.mediaOnly;
        this.tcpoOnly = args.tcpoOnly;
        this.cdn = args.cdn;
        this.static = args.static;
        this.thisPortOnly = args.thisPortOnly;
        this.id = args.id!;
        this.ipAddress = args.ipAddress!;
        this.port = args.port!;
        this.secret = args.secret;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(414687501, false);
        let flags = 0;
        if (this.ipv6) { flags |= 1 << 0; }
        if (this.mediaOnly) { flags |= 1 << 1; }
        if (this.tcpoOnly) { flags |= 1 << 2; }
        if (this.cdn) { flags |= 1 << 3; }
        if (this.static) { flags |= 1 << 4; }
        if (this.thisPortOnly) { flags |= 1 << 5; }
        if (this.secret !== undefined && this.secret !== null) { flags |= 1 << 10; }
        writer.writeInt(flags, false);
        if (this.ipv6 !== undefined && this.ipv6 !== null) {
        }
        if (this.mediaOnly !== undefined && this.mediaOnly !== null) {
        }
        if (this.tcpoOnly !== undefined && this.tcpoOnly !== null) {
        }
        if (this.cdn !== undefined && this.cdn !== null) {
        }
        if (this.static !== undefined && this.static !== null) {
        }
        if (this.thisPortOnly !== undefined && this.thisPortOnly !== null) {
        }
        writer.writeInt(this.id);
        writer.tgWriteString(this.ipAddress);
        writer.writeInt(this.port);
        if (this.secret !== undefined && this.secret !== null) {
            writer.tgWriteBytes(this.secret);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DcOption {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _ipv6 = true;
            args.ipv6 = _ipv6;
        } else {
            args.ipv6 = false;
        }
        if (args.flags & (1 << 1)) {
            const _mediaOnly = true;
            args.mediaOnly = _mediaOnly;
        } else {
            args.mediaOnly = false;
        }
        if (args.flags & (1 << 2)) {
            const _tcpoOnly = true;
            args.tcpoOnly = _tcpoOnly;
        } else {
            args.tcpoOnly = false;
        }
        if (args.flags & (1 << 3)) {
            const _cdn = true;
            args.cdn = _cdn;
        } else {
            args.cdn = false;
        }
        if (args.flags & (1 << 4)) {
            const _static = true;
            args.static = _static;
        } else {
            args.static = false;
        }
        if (args.flags & (1 << 5)) {
            const _thisPortOnly = true;
            args.thisPortOnly = _thisPortOnly;
        } else {
            args.thisPortOnly = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        const _ipAddress = reader.tgReadString();
        args.ipAddress = _ipAddress;
        const _port = reader.readInt();
        args.port = _port;
        if (args.flags & (1 << 10)) {
            const _secret = reader.tgReadBytes();
            args.secret = _secret;
        } else {
            args.secret = undefined;
        }
        return new DcOption(args);
    }
}