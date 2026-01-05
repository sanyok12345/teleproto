import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StoriesStealthMode extends TLObject {
    static CONSTRUCTOR_ID = 1898850301;
    static SUBCLASS_OF_ID = 49120257;
    static className = "StoriesStealthMode";
    static classType = "constructor";

    flags!: number;
    activeUntilDate?: number;
    cooldownUntilDate?: number;

    constructor(args: { flags?: number, activeUntilDate?: number, cooldownUntilDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.activeUntilDate = args.activeUntilDate;
        this.cooldownUntilDate = args.cooldownUntilDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1898850301, false);
        let flags = 0;
        if (this.activeUntilDate !== undefined && this.activeUntilDate !== null) { flags |= 1 << 0; }
        if (this.cooldownUntilDate !== undefined && this.cooldownUntilDate !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.activeUntilDate !== undefined && this.activeUntilDate !== null) {
            writer.writeInt(this.activeUntilDate);
        }
        if (this.cooldownUntilDate !== undefined && this.cooldownUntilDate !== null) {
            writer.writeInt(this.cooldownUntilDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoriesStealthMode {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _activeUntilDate = reader.readInt();
            args.activeUntilDate = _activeUntilDate;
        } else {
            args.activeUntilDate = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _cooldownUntilDate = reader.readInt();
            args.cooldownUntilDate = _cooldownUntilDate;
        } else {
            args.cooldownUntilDate = undefined;
        }
        return new StoriesStealthMode(args);
    }
}