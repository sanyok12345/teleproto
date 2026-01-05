import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class Status extends TLObject {
    static CONSTRUCTOR_ID = 720277905;
    static SUBCLASS_OF_ID = 3448711973;
    static className = "smsjobs.Status";
    static classType = "constructor";

    flags!: number;
    allowInternational?: boolean;
    recentSent!: number;
    recentSince!: number;
    recentRemains!: number;
    totalSent!: number;
    totalSince!: number;
    lastGiftSlug?: string;
    termsUrl!: string;

    constructor(args: { flags?: number, allowInternational?: boolean, recentSent?: number, recentSince?: number, recentRemains?: number, totalSent?: number, totalSince?: number, lastGiftSlug?: string, termsUrl?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.allowInternational = args.allowInternational;
        this.recentSent = args.recentSent!;
        this.recentSince = args.recentSince!;
        this.recentRemains = args.recentRemains!;
        this.totalSent = args.totalSent!;
        this.totalSince = args.totalSince!;
        this.lastGiftSlug = args.lastGiftSlug;
        this.termsUrl = args.termsUrl!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(720277905, false);
        let flags = 0;
        if (this.allowInternational) { flags |= 1 << 0; }
        if (this.lastGiftSlug !== undefined && this.lastGiftSlug !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.allowInternational !== undefined && this.allowInternational !== null) {
        }
        writer.writeInt(this.recentSent);
        writer.writeInt(this.recentSince);
        writer.writeInt(this.recentRemains);
        writer.writeInt(this.totalSent);
        writer.writeInt(this.totalSince);
        if (this.lastGiftSlug !== undefined && this.lastGiftSlug !== null) {
            writer.tgWriteString(this.lastGiftSlug);
        }
        writer.tgWriteString(this.termsUrl);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Status {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _allowInternational = true;
            args.allowInternational = _allowInternational;
        } else {
            args.allowInternational = false;
        }
        const _recentSent = reader.readInt();
        args.recentSent = _recentSent;
        const _recentSince = reader.readInt();
        args.recentSince = _recentSince;
        const _recentRemains = reader.readInt();
        args.recentRemains = _recentRemains;
        const _totalSent = reader.readInt();
        args.totalSent = _totalSent;
        const _totalSince = reader.readInt();
        args.totalSince = _totalSince;
        if (args.flags & (1 << 1)) {
            const _lastGiftSlug = reader.tgReadString();
            args.lastGiftSlug = _lastGiftSlug;
        } else {
            args.lastGiftSlug = undefined;
        }
        const _termsUrl = reader.tgReadString();
        args.termsUrl = _termsUrl;
        return new Status(args);
    }
}