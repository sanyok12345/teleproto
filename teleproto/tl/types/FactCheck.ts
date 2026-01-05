import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class FactCheck extends TLObject {
    static CONSTRUCTOR_ID = 3097230543;
    static SUBCLASS_OF_ID = 1178641315;
    static className = "FactCheck";
    static classType = "constructor";

    flags!: number;
    needCheck?: boolean;
    country?: string;
    text?: TypeTextWithEntities;
    hash!: bigint;

    constructor(args: { flags?: number, needCheck?: boolean, country?: string, text?: TypeTextWithEntities, hash?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.needCheck = args.needCheck;
        this.country = args.country;
        this.text = args.text;
        this.hash = args.hash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3097230543, false);
        let flags = 0;
        if (this.needCheck) { flags |= 1 << 0; }
        if (this.country !== undefined && this.country !== null) { flags |= 1 << 1; }
        if (this.text !== undefined && this.text !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.needCheck !== undefined && this.needCheck !== null) {
        }
        if (this.country !== undefined && this.country !== null) {
            writer.tgWriteString(this.country);
        }
        if (this.text !== undefined && this.text !== null) {
            writer.write(this.text.getBytes());
        }
        writer.writeLargeInt(this.hash, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FactCheck {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _needCheck = true;
            args.needCheck = _needCheck;
        } else {
            args.needCheck = false;
        }
        if (args.flags & (1 << 1)) {
            const _country = reader.tgReadString();
            args.country = _country;
        } else {
            args.country = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _text = reader.tgReadObject();
            args.text = _text;
        } else {
            args.text = undefined;
        }
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new FactCheck(args);
    }
}