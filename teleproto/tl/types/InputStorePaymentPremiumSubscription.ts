import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStorePaymentPremiumSubscription extends TLObject {
    static CONSTRUCTOR_ID = 2792693350;
    static SUBCLASS_OF_ID = 3886290765;
    static className = "InputStorePaymentPremiumSubscription";
    static classType = "constructor";

    flags!: number;
    restore?: boolean;
    upgrade?: boolean;

    constructor(args: { flags?: number, restore?: boolean, upgrade?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.restore = args.restore;
        this.upgrade = args.upgrade;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2792693350, false);
        let flags = 0;
        if (this.restore) { flags |= 1 << 0; }
        if (this.upgrade) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.restore !== undefined && this.restore !== null) {
        }
        if (this.upgrade !== undefined && this.upgrade !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStorePaymentPremiumSubscription {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _restore = true;
            args.restore = _restore;
        } else {
            args.restore = false;
        }
        if (args.flags & (1 << 1)) {
            const _upgrade = true;
            args.upgrade = _upgrade;
        } else {
            args.upgrade = false;
        }
        return new InputStorePaymentPremiumSubscription(args);
    }
}