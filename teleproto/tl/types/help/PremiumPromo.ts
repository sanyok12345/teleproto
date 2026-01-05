import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessageEntity } from "../TypeMessageEntity";
import { TypeDocument } from "../TypeDocument";
import { TypePremiumSubscriptionOption } from "../TypePremiumSubscriptionOption";
import { TypeUser } from "../TypeUser";

export class PremiumPromo extends TLObject {
    static CONSTRUCTOR_ID = 1395946908;
    static SUBCLASS_OF_ID = 3381109560;
    static className = "help.PremiumPromo";
    static classType = "constructor";

    statusText!: string;
    statusEntities!: TypeMessageEntity[];
    videoSections!: string[];
    videos!: TypeDocument[];
    periodOptions!: TypePremiumSubscriptionOption[];
    users!: TypeUser[];

    constructor(args: { statusText?: string, statusEntities?: TypeMessageEntity[], videoSections?: string[], videos?: TypeDocument[], periodOptions?: TypePremiumSubscriptionOption[], users?: TypeUser[] } = {}) {
        super();
        this.statusText = args.statusText!;
        this.statusEntities = args.statusEntities!;
        this.videoSections = args.videoSections!;
        this.videos = args.videos!;
        this.periodOptions = args.periodOptions!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1395946908, false);
        writer.tgWriteString(this.statusText);
        writer.writeVector(this.statusEntities, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.videoSections, (item) => {
            writer.tgWriteString(item);
        });
        writer.writeVector(this.videos, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.periodOptions, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PremiumPromo {
        const args: any = {};
        const _statusText = reader.tgReadString();
        args.statusText = _statusText;
        const _statusEntities = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.statusEntities = _statusEntities;
        const _videoSections = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.videoSections = _videoSections;
        const _videos = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.videos = _videos;
        const _periodOptions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.periodOptions = _periodOptions;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new PremiumPromo(args);
    }
}