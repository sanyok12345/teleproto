import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputMedia } from "../../types/TypeInputMedia";
import { TypeMediaArea } from "../../types/TypeMediaArea";
import { TypeMessageEntity } from "../../types/TypeMessageEntity";
import { TypeInputPrivacyRule } from "../../types/TypeInputPrivacyRule";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendStory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1937752812;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "stories.SendStory";
    static classType = "request";

    flags?: number;
    pinned?: boolean;
    noforwards?: boolean;
    fwdModified?: boolean;
    peer?: EntityLike;
    media!: TypeInputMedia;
    mediaAreas?: TypeMediaArea[];
    caption?: string;
    entities?: TypeMessageEntity[];
    privacyRules!: TypeInputPrivacyRule[];
    randomId!: bigint;
    period?: number;
    fwdFromId?: EntityLike;
    fwdFromStory?: number;
    albums?: number[];

    constructor(args: { flags?: number, pinned?: boolean, noforwards?: boolean, fwdModified?: boolean, peer?: EntityLike, media?: TypeInputMedia, mediaAreas?: TypeMediaArea[], caption?: string, entities?: TypeMessageEntity[], privacyRules?: TypeInputPrivacyRule[], randomId?: bigint, period?: number, fwdFromId?: EntityLike, fwdFromStory?: number, albums?: number[] } = {}) {
        super();
        this.flags = args.flags;
        this.pinned = args.pinned;
        this.noforwards = args.noforwards;
        this.fwdModified = args.fwdModified;
        this.peer = args.peer;
        this.media = args.media!;
        this.mediaAreas = args.mediaAreas;
        this.caption = args.caption;
        this.entities = args.entities;
        this.privacyRules = args.privacyRules!;
        this.randomId = args.randomId!;
        this.period = args.period;
        this.fwdFromId = args.fwdFromId;
        this.fwdFromStory = args.fwdFromStory;
        this.albums = args.albums;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1937752812, false);
        let flags = 0;
        if (this.pinned) { flags |= 1 << 2; }
        if (this.noforwards) { flags |= 1 << 4; }
        if (this.fwdModified) { flags |= 1 << 7; }
        if (this.mediaAreas !== undefined && this.mediaAreas !== null) { flags |= 1 << 5; }
        if (this.caption !== undefined && this.caption !== null) { flags |= 1 << 0; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 1; }
        if (this.period !== undefined && this.period !== null) { flags |= 1 << 3; }
        if (this.fwdFromId !== undefined && this.fwdFromId !== null) { flags |= 1 << 6; }
        if (this.fwdFromStory !== undefined && this.fwdFromStory !== null) { flags |= 1 << 6; }
        if (this.albums !== undefined && this.albums !== null) { flags |= 1 << 8; }
        writer.writeInt(flags, false);
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        if (this.noforwards !== undefined && this.noforwards !== null) {
        }
        if (this.fwdModified !== undefined && this.fwdModified !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.write(this.media.getBytes());
        if (this.mediaAreas !== undefined && this.mediaAreas !== null) {
            writer.writeVector(this.mediaAreas, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.caption !== undefined && this.caption !== null) {
            writer.tgWriteString(this.caption);
        }
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.writeVector(this.privacyRules, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeLargeInt(this.randomId, 64);
        if (this.period !== undefined && this.period !== null) {
            writer.writeInt(this.period);
        }
        if (this.fwdFromId !== undefined && this.fwdFromId !== null) {
            writer.write((this.fwdFromId as any).getBytes());
        }
        if (this.fwdFromStory !== undefined && this.fwdFromStory !== null) {
            writer.writeInt(this.fwdFromStory);
        }
        if (this.albums !== undefined && this.albums !== null) {
            writer.writeVector(this.albums, (item) => {
                writer.writeInt(item);
            });
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendStory {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        if (args.flags & (1 << 4)) {
            const _noforwards = true;
            args.noforwards = _noforwards;
        } else {
            args.noforwards = false;
        }
        if (args.flags & (1 << 7)) {
            const _fwdModified = true;
            args.fwdModified = _fwdModified;
        } else {
            args.fwdModified = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _media = reader.tgReadObject();
        args.media = _media;
        if (args.flags & (1 << 5)) {
            const _mediaAreas = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.mediaAreas = _mediaAreas;
        } else {
            args.mediaAreas = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _caption = reader.tgReadString();
            args.caption = _caption;
        } else {
            args.caption = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        const _privacyRules = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.privacyRules = _privacyRules;
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        if (args.flags & (1 << 3)) {
            const _period = reader.readInt();
            args.period = _period;
        } else {
            args.period = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _fwdFromId = reader.tgReadObject();
            args.fwdFromId = _fwdFromId;
        } else {
            args.fwdFromId = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _fwdFromStory = reader.readInt();
            args.fwdFromStory = _fwdFromStory;
        } else {
            args.fwdFromStory = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _albums = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.albums = _albums;
        } else {
            args.albums = undefined;
        }
        return new SendStory(args);
    }
}