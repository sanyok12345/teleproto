import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStarsAmount } from "../TypeStarsAmount";
import { TypeStarsSubscription } from "../TypeStarsSubscription";
import { TypeStarsTransaction } from "../TypeStarsTransaction";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class StarsStatus extends TLObject {
    static CONSTRUCTOR_ID = 1822222573;
    static SUBCLASS_OF_ID = 1855724911;
    static className = "payments.StarsStatus";
    static classType = "constructor";

    flags!: number;
    balance!: TypeStarsAmount;
    subscriptions?: TypeStarsSubscription[];
    subscriptionsNextOffset?: string;
    subscriptionsMissingBalance?: bigint;
    history?: TypeStarsTransaction[];
    nextOffset?: string;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, balance?: TypeStarsAmount, subscriptions?: TypeStarsSubscription[], subscriptionsNextOffset?: string, subscriptionsMissingBalance?: bigint, history?: TypeStarsTransaction[], nextOffset?: string, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.balance = args.balance!;
        this.subscriptions = args.subscriptions;
        this.subscriptionsNextOffset = args.subscriptionsNextOffset;
        this.subscriptionsMissingBalance = args.subscriptionsMissingBalance;
        this.history = args.history;
        this.nextOffset = args.nextOffset;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1822222573, false);
        let flags = 0;
        if (this.subscriptions !== undefined && this.subscriptions !== null) { flags |= 1 << 1; }
        if (this.subscriptionsNextOffset !== undefined && this.subscriptionsNextOffset !== null) { flags |= 1 << 2; }
        if (this.subscriptionsMissingBalance !== undefined && this.subscriptionsMissingBalance !== null) { flags |= 1 << 4; }
        if (this.history !== undefined && this.history !== null) { flags |= 1 << 3; }
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.balance.getBytes());
        if (this.subscriptions !== undefined && this.subscriptions !== null) {
            writer.writeVector(this.subscriptions, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.subscriptionsNextOffset !== undefined && this.subscriptionsNextOffset !== null) {
            writer.tgWriteString(this.subscriptionsNextOffset);
        }
        if (this.subscriptionsMissingBalance !== undefined && this.subscriptionsMissingBalance !== null) {
            writer.writeLargeInt(this.subscriptionsMissingBalance, 64);
        }
        if (this.history !== undefined && this.history !== null) {
            writer.writeVector(this.history, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.nextOffset !== undefined && this.nextOffset !== null) {
            writer.tgWriteString(this.nextOffset);
        }
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsStatus {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _balance = reader.tgReadObject();
        args.balance = _balance;
        if (args.flags & (1 << 1)) {
            const _subscriptions = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.subscriptions = _subscriptions;
        } else {
            args.subscriptions = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _subscriptionsNextOffset = reader.tgReadString();
            args.subscriptionsNextOffset = _subscriptionsNextOffset;
        } else {
            args.subscriptionsNextOffset = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _subscriptionsMissingBalance = reader.readLargeInt(64);
            args.subscriptionsMissingBalance = _subscriptionsMissingBalance;
        } else {
            args.subscriptionsMissingBalance = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _history = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.history = _history;
        } else {
            args.history = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _nextOffset = reader.tgReadString();
            args.nextOffset = _nextOffset;
        } else {
            args.nextOffset = undefined;
        }
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new StarsStatus(args);
    }
}