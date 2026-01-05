import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputUser } from "./TypeInputUser";
import { TypeInputPeer } from "./TypeInputPeer";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class InputStorePaymentPremiumGiftCode extends TLObject {
    static CONSTRUCTOR_ID = 4219011987;
    static SUBCLASS_OF_ID = 3886290765;
    static className = "InputStorePaymentPremiumGiftCode";
    static classType = "constructor";

    flags!: number;
    users!: TypeInputUser[];
    boostPeer?: TypeInputPeer;
    currency!: string;
    amount!: bigint;
    message?: TypeTextWithEntities;

    constructor(args: { flags?: number, users?: TypeInputUser[], boostPeer?: TypeInputPeer, currency?: string, amount?: bigint, message?: TypeTextWithEntities } = {}) {
        super();
        this.flags = args.flags!;
        this.users = args.users!;
        this.boostPeer = args.boostPeer;
        this.currency = args.currency!;
        this.amount = args.amount!;
        this.message = args.message;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4219011987, false);
        let flags = 0;
        if (this.boostPeer !== undefined && this.boostPeer !== null) { flags |= 1 << 0; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        if (this.boostPeer !== undefined && this.boostPeer !== null) {
            writer.write(this.boostPeer.getBytes());
        }
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        if (this.message !== undefined && this.message !== null) {
            writer.write(this.message.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStorePaymentPremiumGiftCode {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        if (args.flags & (1 << 0)) {
            const _boostPeer = reader.tgReadObject();
            args.boostPeer = _boostPeer;
        } else {
            args.boostPeer = undefined;
        }
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        if (args.flags & (1 << 1)) {
            const _message = reader.tgReadObject();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        return new InputStorePaymentPremiumGiftCode(args);
    }
}