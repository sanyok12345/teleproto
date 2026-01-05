import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageEntity } from "./TypeMessageEntity";

export class InputBusinessChatLink extends TLObject {
    static CONSTRUCTOR_ID = 292003751;
    static SUBCLASS_OF_ID = 2875655443;
    static className = "InputBusinessChatLink";
    static classType = "constructor";

    flags!: number;
    message!: string;
    entities?: TypeMessageEntity[];
    title?: string;

    constructor(args: { flags?: number, message?: string, entities?: TypeMessageEntity[], title?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.message = args.message!;
        this.entities = args.entities;
        this.title = args.title;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(292003751, false);
        let flags = 0;
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 0; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.message);
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBusinessChatLink {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
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
        return new InputBusinessChatLink(args);
    }
}