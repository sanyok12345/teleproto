import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeTextWithEntities } from "../../types/TypeTextWithEntities";
import { TypeTranslatedText } from "../../types/messages/TypeTranslatedText";

export class TranslateText extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1662529584;
    static SUBCLASS_OF_ID = 37897192;
    static className = "messages.TranslateText";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    id?: number[];
    text?: TypeTextWithEntities[];
    toLang!: string;

    constructor(args: { flags?: number, peer?: EntityLike, id?: number[], text?: TypeTextWithEntities[], toLang?: string } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.id = args.id;
        this.text = args.text;
        this.toLang = args.toLang!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1662529584, false);
        let flags = 0;
        if (this.peer !== undefined && this.peer !== null) { flags |= 1 << 0; }
        if (this.id !== undefined && this.id !== null) { flags |= 1 << 0; }
        if (this.text !== undefined && this.text !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.peer !== undefined && this.peer !== null) {
            writer.write((this.peer as any).getBytes());
        }
        if (this.id !== undefined && this.id !== null) {
            writer.writeVector(this.id, (item) => {
                writer.writeInt(item);
            });
        }
        if (this.text !== undefined && this.text !== null) {
            writer.writeVector(this.text, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.tgWriteString(this.toLang);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeTranslatedText {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): TranslateText {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _peer = reader.tgReadObject();
            args.peer = _peer;
        } else {
            args.peer = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _id = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.id = _id;
        } else {
            args.id = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _text = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.text = _text;
        } else {
            args.text = undefined;
        }
        const _toLang = reader.tgReadString();
        args.toLang = _toLang;
        return new TranslateText(args);
    }
}