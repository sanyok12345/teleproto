import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";
import { TypeUser } from "./TypeUser";
import { TypeStarsSubscriptionPricing } from "./TypeStarsSubscriptionPricing";
import { TypeBotVerification } from "./TypeBotVerification";

export class ChatInvite extends TLObject {
    static CONSTRUCTOR_ID = 1553807106;
    static SUBCLASS_OF_ID = 72750902;
    static className = "ChatInvite";
    static classType = "constructor";

    flags!: number;
    channel?: boolean;
    broadcast?: boolean;
    public?: boolean;
    megagroup?: boolean;
    requestNeeded?: boolean;
    verified?: boolean;
    scam?: boolean;
    fake?: boolean;
    canRefulfillSubscription?: boolean;
    title!: string;
    about?: string;
    photo!: TypePhoto;
    participantsCount!: number;
    participants?: TypeUser[];
    color!: number;
    subscriptionPricing?: TypeStarsSubscriptionPricing;
    subscriptionFormId?: bigint;
    botVerification?: TypeBotVerification;

    constructor(args: { flags?: number, channel?: boolean, broadcast?: boolean, public?: boolean, megagroup?: boolean, requestNeeded?: boolean, verified?: boolean, scam?: boolean, fake?: boolean, canRefulfillSubscription?: boolean, title?: string, about?: string, photo?: TypePhoto, participantsCount?: number, participants?: TypeUser[], color?: number, subscriptionPricing?: TypeStarsSubscriptionPricing, subscriptionFormId?: bigint, botVerification?: TypeBotVerification } = {}) {
        super();
        this.flags = args.flags!;
        this.channel = args.channel;
        this.broadcast = args.broadcast;
        this.public = args.public;
        this.megagroup = args.megagroup;
        this.requestNeeded = args.requestNeeded;
        this.verified = args.verified;
        this.scam = args.scam;
        this.fake = args.fake;
        this.canRefulfillSubscription = args.canRefulfillSubscription;
        this.title = args.title!;
        this.about = args.about;
        this.photo = args.photo!;
        this.participantsCount = args.participantsCount!;
        this.participants = args.participants;
        this.color = args.color!;
        this.subscriptionPricing = args.subscriptionPricing;
        this.subscriptionFormId = args.subscriptionFormId;
        this.botVerification = args.botVerification;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1553807106, false);
        let flags = 0;
        if (this.channel) { flags |= 1 << 0; }
        if (this.broadcast) { flags |= 1 << 1; }
        if (this.public) { flags |= 1 << 2; }
        if (this.megagroup) { flags |= 1 << 3; }
        if (this.requestNeeded) { flags |= 1 << 6; }
        if (this.verified) { flags |= 1 << 7; }
        if (this.scam) { flags |= 1 << 8; }
        if (this.fake) { flags |= 1 << 9; }
        if (this.canRefulfillSubscription) { flags |= 1 << 11; }
        if (this.about !== undefined && this.about !== null) { flags |= 1 << 5; }
        if (this.participants !== undefined && this.participants !== null) { flags |= 1 << 4; }
        if (this.subscriptionPricing !== undefined && this.subscriptionPricing !== null) { flags |= 1 << 10; }
        if (this.subscriptionFormId !== undefined && this.subscriptionFormId !== null) { flags |= 1 << 12; }
        if (this.botVerification !== undefined && this.botVerification !== null) { flags |= 1 << 13; }
        writer.writeInt(flags, false);
        if (this.channel !== undefined && this.channel !== null) {
        }
        if (this.broadcast !== undefined && this.broadcast !== null) {
        }
        if (this.public !== undefined && this.public !== null) {
        }
        if (this.megagroup !== undefined && this.megagroup !== null) {
        }
        if (this.requestNeeded !== undefined && this.requestNeeded !== null) {
        }
        if (this.verified !== undefined && this.verified !== null) {
        }
        if (this.scam !== undefined && this.scam !== null) {
        }
        if (this.fake !== undefined && this.fake !== null) {
        }
        if (this.canRefulfillSubscription !== undefined && this.canRefulfillSubscription !== null) {
        }
        writer.tgWriteString(this.title);
        if (this.about !== undefined && this.about !== null) {
            writer.tgWriteString(this.about);
        }
        writer.write(this.photo.getBytes());
        writer.writeInt(this.participantsCount);
        if (this.participants !== undefined && this.participants !== null) {
            writer.writeVector(this.participants, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.writeInt(this.color);
        if (this.subscriptionPricing !== undefined && this.subscriptionPricing !== null) {
            writer.write(this.subscriptionPricing.getBytes());
        }
        if (this.subscriptionFormId !== undefined && this.subscriptionFormId !== null) {
            writer.writeLargeInt(this.subscriptionFormId, 64);
        }
        if (this.botVerification !== undefined && this.botVerification !== null) {
            writer.write(this.botVerification.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatInvite {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _channel = true;
            args.channel = _channel;
        } else {
            args.channel = false;
        }
        if (args.flags & (1 << 1)) {
            const _broadcast = true;
            args.broadcast = _broadcast;
        } else {
            args.broadcast = false;
        }
        if (args.flags & (1 << 2)) {
            const _public = true;
            args.public = _public;
        } else {
            args.public = false;
        }
        if (args.flags & (1 << 3)) {
            const _megagroup = true;
            args.megagroup = _megagroup;
        } else {
            args.megagroup = false;
        }
        if (args.flags & (1 << 6)) {
            const _requestNeeded = true;
            args.requestNeeded = _requestNeeded;
        } else {
            args.requestNeeded = false;
        }
        if (args.flags & (1 << 7)) {
            const _verified = true;
            args.verified = _verified;
        } else {
            args.verified = false;
        }
        if (args.flags & (1 << 8)) {
            const _scam = true;
            args.scam = _scam;
        } else {
            args.scam = false;
        }
        if (args.flags & (1 << 9)) {
            const _fake = true;
            args.fake = _fake;
        } else {
            args.fake = false;
        }
        if (args.flags & (1 << 11)) {
            const _canRefulfillSubscription = true;
            args.canRefulfillSubscription = _canRefulfillSubscription;
        } else {
            args.canRefulfillSubscription = false;
        }
        const _title = reader.tgReadString();
        args.title = _title;
        if (args.flags & (1 << 5)) {
            const _about = reader.tgReadString();
            args.about = _about;
        } else {
            args.about = undefined;
        }
        const _photo = reader.tgReadObject();
        args.photo = _photo;
        const _participantsCount = reader.readInt();
        args.participantsCount = _participantsCount;
        if (args.flags & (1 << 4)) {
            const _participants = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.participants = _participants;
        } else {
            args.participants = undefined;
        }
        const _color = reader.readInt();
        args.color = _color;
        if (args.flags & (1 << 10)) {
            const _subscriptionPricing = reader.tgReadObject();
            args.subscriptionPricing = _subscriptionPricing;
        } else {
            args.subscriptionPricing = undefined;
        }
        if (args.flags & (1 << 12)) {
            const _subscriptionFormId = reader.readLargeInt(64);
            args.subscriptionFormId = _subscriptionFormId;
        } else {
            args.subscriptionFormId = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _botVerification = reader.tgReadObject();
            args.botVerification = _botVerification;
        } else {
            args.botVerification = undefined;
        }
        return new ChatInvite(args);
    }
}