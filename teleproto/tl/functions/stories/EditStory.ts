import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputMedia } from "../../types/TypeInputMedia";
import { TypeMediaArea } from "../../types/TypeMediaArea";
import { TypeMessageEntity } from "../../types/TypeMessageEntity";
import { TypeInputPrivacyRule } from "../../types/TypeInputPrivacyRule";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditStory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3045308998;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "stories.EditStory";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    id?: number;
    media?: TypeInputMedia;
    mediaAreas?: TypeMediaArea[];
    caption?: string;
    entities?: TypeMessageEntity[];
    privacyRules?: TypeInputPrivacyRule[];

    constructor(args: { flags?: number, peer?: EntityLike, id?: number, media?: TypeInputMedia, mediaAreas?: TypeMediaArea[], caption?: string, entities?: TypeMessageEntity[], privacyRules?: TypeInputPrivacyRule[] } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.id = args.id;
        this.media = args.media;
        this.mediaAreas = args.mediaAreas;
        this.caption = args.caption;
        this.entities = args.entities;
        this.privacyRules = args.privacyRules;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3045308998, false);
        let flags = 0;
        if (this.media !== undefined && this.media !== null) { flags |= 1 << 0; }
        if (this.mediaAreas !== undefined && this.mediaAreas !== null) { flags |= 1 << 3; }
        if (this.caption !== undefined && this.caption !== null) { flags |= 1 << 1; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 1; }
        if (this.privacyRules !== undefined && this.privacyRules !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        if (this.media !== undefined && this.media !== null) {
            writer.write(this.media.getBytes());
        }
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
        if (this.privacyRules !== undefined && this.privacyRules !== null) {
            writer.writeVector(this.privacyRules, (item) => {
                writer.write(item.getBytes());
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

    static fromReader(reader: BinaryReader): EditStory {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        if (args.flags & (1 << 0)) {
            const _media = reader.tgReadObject();
            args.media = _media;
        } else {
            args.media = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _mediaAreas = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.mediaAreas = _mediaAreas;
        } else {
            args.mediaAreas = undefined;
        }
        if (args.flags & (1 << 1)) {
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
        if (args.flags & (1 << 2)) {
            const _privacyRules = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.privacyRules = _privacyRules;
        } else {
            args.privacyRules = undefined;
        }
        return new EditStory(args);
    }
}