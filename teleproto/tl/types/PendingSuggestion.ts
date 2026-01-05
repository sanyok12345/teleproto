import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class PendingSuggestion extends TLObject {
    static CONSTRUCTOR_ID = 3890753042;
    static SUBCLASS_OF_ID = 3126949031;
    static className = "PendingSuggestion";
    static classType = "constructor";

    suggestion!: string;
    title!: TypeTextWithEntities;
    description!: TypeTextWithEntities;
    url!: string;

    constructor(args: { suggestion?: string, title?: TypeTextWithEntities, description?: TypeTextWithEntities, url?: string } = {}) {
        super();
        this.suggestion = args.suggestion!;
        this.title = args.title!;
        this.description = args.description!;
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3890753042, false);
        writer.tgWriteString(this.suggestion);
        writer.write(this.title.getBytes());
        writer.write(this.description.getBytes());
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PendingSuggestion {
        const args: any = {};
        const _suggestion = reader.tgReadString();
        args.suggestion = _suggestion;
        const _title = reader.tgReadObject();
        args.title = _title;
        const _description = reader.tgReadObject();
        args.description = _description;
        const _url = reader.tgReadString();
        args.url = _url;
        return new PendingSuggestion(args);
    }
}