import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class AvailableEffect extends TLObject {
    static CONSTRUCTOR_ID = 2479088254;
    static SUBCLASS_OF_ID = 2556047233;
    static className = "AvailableEffect";
    static classType = "constructor";

    flags!: number;
    premiumRequired?: boolean;
    id!: bigint;
    emoticon!: string;
    staticIconId?: bigint;
    effectStickerId!: bigint;
    effectAnimationId?: bigint;

    constructor(args: { flags?: number, premiumRequired?: boolean, id?: bigint, emoticon?: string, staticIconId?: bigint, effectStickerId?: bigint, effectAnimationId?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.premiumRequired = args.premiumRequired;
        this.id = args.id!;
        this.emoticon = args.emoticon!;
        this.staticIconId = args.staticIconId;
        this.effectStickerId = args.effectStickerId!;
        this.effectAnimationId = args.effectAnimationId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2479088254, false);
        let flags = 0;
        if (this.premiumRequired) { flags |= 1 << 2; }
        if (this.staticIconId !== undefined && this.staticIconId !== null) { flags |= 1 << 0; }
        if (this.effectAnimationId !== undefined && this.effectAnimationId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.premiumRequired !== undefined && this.premiumRequired !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.tgWriteString(this.emoticon);
        if (this.staticIconId !== undefined && this.staticIconId !== null) {
            writer.writeLargeInt(this.staticIconId, 64);
        }
        writer.writeLargeInt(this.effectStickerId, 64);
        if (this.effectAnimationId !== undefined && this.effectAnimationId !== null) {
            writer.writeLargeInt(this.effectAnimationId, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AvailableEffect {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _premiumRequired = true;
            args.premiumRequired = _premiumRequired;
        } else {
            args.premiumRequired = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _emoticon = reader.tgReadString();
        args.emoticon = _emoticon;
        if (args.flags & (1 << 0)) {
            const _staticIconId = reader.readLargeInt(64);
            args.staticIconId = _staticIconId;
        } else {
            args.staticIconId = undefined;
        }
        const _effectStickerId = reader.readLargeInt(64);
        args.effectStickerId = _effectStickerId;
        if (args.flags & (1 << 1)) {
            const _effectAnimationId = reader.readLargeInt(64);
            args.effectAnimationId = _effectAnimationId;
        } else {
            args.effectAnimationId = undefined;
        }
        return new AvailableEffect(args);
    }
}