import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeStarGiftAttribute } from "./TypeStarGiftAttribute";
import { TypeStarsAmount } from "./TypeStarsAmount";
import { TypePeerColor } from "./TypePeerColor";

export class StarGiftUnique extends TLObject {
    static CONSTRUCTOR_ID = 1453155529;
    static SUBCLASS_OF_ID = 3273414923;
    static className = "StarGiftUnique";
    static classType = "constructor";

    flags!: number;
    requirePremium?: boolean;
    resaleTonOnly?: boolean;
    themeAvailable?: boolean;
    id!: bigint;
    giftId!: bigint;
    title!: string;
    slug!: string;
    num!: number;
    ownerId?: TypePeer;
    ownerName?: string;
    ownerAddress?: string;
    attributes!: TypeStarGiftAttribute[];
    availabilityIssued!: number;
    availabilityTotal!: number;
    giftAddress?: string;
    resellAmount?: TypeStarsAmount[];
    releasedBy?: TypePeer;
    valueAmount?: bigint;
    valueCurrency?: string;
    valueUsdAmount?: bigint;
    themePeer?: TypePeer;
    peerColor?: TypePeerColor;
    hostId?: TypePeer;
    offerMinStars?: number;

    constructor(args: { flags?: number, requirePremium?: boolean, resaleTonOnly?: boolean, themeAvailable?: boolean, id?: bigint, giftId?: bigint, title?: string, slug?: string, num?: number, ownerId?: TypePeer, ownerName?: string, ownerAddress?: string, attributes?: TypeStarGiftAttribute[], availabilityIssued?: number, availabilityTotal?: number, giftAddress?: string, resellAmount?: TypeStarsAmount[], releasedBy?: TypePeer, valueAmount?: bigint, valueCurrency?: string, valueUsdAmount?: bigint, themePeer?: TypePeer, peerColor?: TypePeerColor, hostId?: TypePeer, offerMinStars?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.requirePremium = args.requirePremium;
        this.resaleTonOnly = args.resaleTonOnly;
        this.themeAvailable = args.themeAvailable;
        this.id = args.id!;
        this.giftId = args.giftId!;
        this.title = args.title!;
        this.slug = args.slug!;
        this.num = args.num!;
        this.ownerId = args.ownerId;
        this.ownerName = args.ownerName;
        this.ownerAddress = args.ownerAddress;
        this.attributes = args.attributes!;
        this.availabilityIssued = args.availabilityIssued!;
        this.availabilityTotal = args.availabilityTotal!;
        this.giftAddress = args.giftAddress;
        this.resellAmount = args.resellAmount;
        this.releasedBy = args.releasedBy;
        this.valueAmount = args.valueAmount;
        this.valueCurrency = args.valueCurrency;
        this.valueUsdAmount = args.valueUsdAmount;
        this.themePeer = args.themePeer;
        this.peerColor = args.peerColor;
        this.hostId = args.hostId;
        this.offerMinStars = args.offerMinStars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1453155529, false);
        let flags = 0;
        if (this.requirePremium) { flags |= 1 << 6; }
        if (this.resaleTonOnly) { flags |= 1 << 7; }
        if (this.themeAvailable) { flags |= 1 << 9; }
        if (this.ownerId !== undefined && this.ownerId !== null) { flags |= 1 << 0; }
        if (this.ownerName !== undefined && this.ownerName !== null) { flags |= 1 << 1; }
        if (this.ownerAddress !== undefined && this.ownerAddress !== null) { flags |= 1 << 2; }
        if (this.giftAddress !== undefined && this.giftAddress !== null) { flags |= 1 << 3; }
        if (this.resellAmount !== undefined && this.resellAmount !== null) { flags |= 1 << 4; }
        if (this.releasedBy !== undefined && this.releasedBy !== null) { flags |= 1 << 5; }
        if (this.valueAmount !== undefined && this.valueAmount !== null) { flags |= 1 << 8; }
        if (this.valueCurrency !== undefined && this.valueCurrency !== null) { flags |= 1 << 8; }
        if (this.valueUsdAmount !== undefined && this.valueUsdAmount !== null) { flags |= 1 << 8; }
        if (this.themePeer !== undefined && this.themePeer !== null) { flags |= 1 << 10; }
        if (this.peerColor !== undefined && this.peerColor !== null) { flags |= 1 << 11; }
        if (this.hostId !== undefined && this.hostId !== null) { flags |= 1 << 12; }
        if (this.offerMinStars !== undefined && this.offerMinStars !== null) { flags |= 1 << 13; }
        writer.writeInt(flags, false);
        if (this.requirePremium !== undefined && this.requirePremium !== null) {
        }
        if (this.resaleTonOnly !== undefined && this.resaleTonOnly !== null) {
        }
        if (this.themeAvailable !== undefined && this.themeAvailable !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.giftId, 64);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.slug);
        writer.writeInt(this.num);
        if (this.ownerId !== undefined && this.ownerId !== null) {
            writer.write(this.ownerId.getBytes());
        }
        if (this.ownerName !== undefined && this.ownerName !== null) {
            writer.tgWriteString(this.ownerName);
        }
        if (this.ownerAddress !== undefined && this.ownerAddress !== null) {
            writer.tgWriteString(this.ownerAddress);
        }
        writer.writeVector(this.attributes, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.availabilityIssued);
        writer.writeInt(this.availabilityTotal);
        if (this.giftAddress !== undefined && this.giftAddress !== null) {
            writer.tgWriteString(this.giftAddress);
        }
        if (this.resellAmount !== undefined && this.resellAmount !== null) {
            writer.writeVector(this.resellAmount, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.releasedBy !== undefined && this.releasedBy !== null) {
            writer.write(this.releasedBy.getBytes());
        }
        if (this.valueAmount !== undefined && this.valueAmount !== null) {
            writer.writeLargeInt(this.valueAmount, 64);
        }
        if (this.valueCurrency !== undefined && this.valueCurrency !== null) {
            writer.tgWriteString(this.valueCurrency);
        }
        if (this.valueUsdAmount !== undefined && this.valueUsdAmount !== null) {
            writer.writeLargeInt(this.valueUsdAmount, 64);
        }
        if (this.themePeer !== undefined && this.themePeer !== null) {
            writer.write(this.themePeer.getBytes());
        }
        if (this.peerColor !== undefined && this.peerColor !== null) {
            writer.write(this.peerColor.getBytes());
        }
        if (this.hostId !== undefined && this.hostId !== null) {
            writer.write(this.hostId.getBytes());
        }
        if (this.offerMinStars !== undefined && this.offerMinStars !== null) {
            writer.writeInt(this.offerMinStars);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftUnique {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 6)) {
            const _requirePremium = true;
            args.requirePremium = _requirePremium;
        } else {
            args.requirePremium = false;
        }
        if (args.flags & (1 << 7)) {
            const _resaleTonOnly = true;
            args.resaleTonOnly = _resaleTonOnly;
        } else {
            args.resaleTonOnly = false;
        }
        if (args.flags & (1 << 9)) {
            const _themeAvailable = true;
            args.themeAvailable = _themeAvailable;
        } else {
            args.themeAvailable = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _giftId = reader.readLargeInt(64);
        args.giftId = _giftId;
        const _title = reader.tgReadString();
        args.title = _title;
        const _slug = reader.tgReadString();
        args.slug = _slug;
        const _num = reader.readInt();
        args.num = _num;
        if (args.flags & (1 << 0)) {
            const _ownerId = reader.tgReadObject();
            args.ownerId = _ownerId;
        } else {
            args.ownerId = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _ownerName = reader.tgReadString();
            args.ownerName = _ownerName;
        } else {
            args.ownerName = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _ownerAddress = reader.tgReadString();
            args.ownerAddress = _ownerAddress;
        } else {
            args.ownerAddress = undefined;
        }
        const _attributes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.attributes = _attributes;
        const _availabilityIssued = reader.readInt();
        args.availabilityIssued = _availabilityIssued;
        const _availabilityTotal = reader.readInt();
        args.availabilityTotal = _availabilityTotal;
        if (args.flags & (1 << 3)) {
            const _giftAddress = reader.tgReadString();
            args.giftAddress = _giftAddress;
        } else {
            args.giftAddress = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _resellAmount = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.resellAmount = _resellAmount;
        } else {
            args.resellAmount = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _releasedBy = reader.tgReadObject();
            args.releasedBy = _releasedBy;
        } else {
            args.releasedBy = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _valueAmount = reader.readLargeInt(64);
            args.valueAmount = _valueAmount;
        } else {
            args.valueAmount = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _valueCurrency = reader.tgReadString();
            args.valueCurrency = _valueCurrency;
        } else {
            args.valueCurrency = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _valueUsdAmount = reader.readLargeInt(64);
            args.valueUsdAmount = _valueUsdAmount;
        } else {
            args.valueUsdAmount = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _themePeer = reader.tgReadObject();
            args.themePeer = _themePeer;
        } else {
            args.themePeer = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _peerColor = reader.tgReadObject();
            args.peerColor = _peerColor;
        } else {
            args.peerColor = undefined;
        }
        if (args.flags & (1 << 12)) {
            const _hostId = reader.tgReadObject();
            args.hostId = _hostId;
        } else {
            args.hostId = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _offerMinStars = reader.readInt();
            args.offerMinStars = _offerMinStars;
        } else {
            args.offerMinStars = undefined;
        }
        return new StarGiftUnique(args);
    }
}