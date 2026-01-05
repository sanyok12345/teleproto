import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageEntity } from "./TypeMessageEntity";

export class BusinessChatLink extends TLObject {
    static CONSTRUCTOR_ID = 3031328367;
    static SUBCLASS_OF_ID = 1007504011;
    static className = "BusinessChatLink";
    static classType = "constructor";

    flags!: number;
    link!: string;
    message!: string;
    entities?: TypeMessageEntity[];
    title?: string;
    views!: number;

    constructor(args: { flags?: number, link?: string, message?: string, entities?: TypeMessageEntity[], title?: string, views?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.link = args.link!;
        this.message = args.message!;
        this.entities = args.entities;
        this.title = args.title;
        this.views = args.views!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3031328367, false);
        let flags = 0;
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 0; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.link);
        writer.tgWriteString(this.message);
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        writer.writeInt(this.views);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BusinessChatLink {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _link = reader.tgReadString();
        args.link = _link;
        const _message = reader.tgReadString();
        args.message = _message;
        if (args.flags & (1 << 0)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        const _views = reader.readInt();
        args.views = _views;
        return new BusinessChatLink(args);
    }
}