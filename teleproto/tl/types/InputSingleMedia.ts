import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputMedia } from "./TypeInputMedia";
import { TypeMessageEntity } from "./TypeMessageEntity";

export class InputSingleMedia extends TLObject {
    static CONSTRUCTOR_ID = 482797855;
    static SUBCLASS_OF_ID = 566922968;
    static className = "InputSingleMedia";
    static classType = "constructor";

    flags!: number;
    media!: TypeInputMedia;
    randomId!: bigint;
    message!: string;
    entities?: TypeMessageEntity[];

    constructor(args: { flags?: number, media?: TypeInputMedia, randomId?: bigint, message?: string, entities?: TypeMessageEntity[] } = {}) {
        super();
        this.flags = args.flags!;
        this.media = args.media!;
        this.randomId = args.randomId!;
        this.message = args.message!;
        this.entities = args.entities;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(482797855, false);
        let flags = 0;
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.media.getBytes());
        writer.writeLargeInt(this.randomId, 64);
        writer.tgWriteString(this.message);
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputSingleMedia {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _media = reader.tgReadObject();
        args.media = _media;
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
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
        return new InputSingleMedia(args);
    }
}