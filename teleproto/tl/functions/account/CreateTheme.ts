import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDocument } from "../../types/TypeInputDocument";
import { TypeInputThemeSettings } from "../../types/TypeInputThemeSettings";
import { TypeTheme } from "../../types/TypeTheme";

export class CreateTheme extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1697530880;
    static SUBCLASS_OF_ID = 1454688268;
    static className = "account.CreateTheme";
    static classType = "request";

    flags?: number;
    slug!: string;
    title!: string;
    document?: TypeInputDocument;
    settings?: TypeInputThemeSettings[];

    constructor(args: { flags?: number, slug?: string, title?: string, document?: TypeInputDocument, settings?: TypeInputThemeSettings[] } = {}) {
        super();
        this.flags = args.flags;
        this.slug = args.slug!;
        this.title = args.title!;
        this.document = args.document;
        this.settings = args.settings;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1697530880, false);
        let flags = 0;
        if (this.document !== undefined && this.document !== null) { flags |= 1 << 2; }
        if (this.settings !== undefined && this.settings !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.slug);
        writer.tgWriteString(this.title);
        if (this.document !== undefined && this.document !== null) {
            writer.write(this.document.getBytes());
        }
        if (this.settings !== undefined && this.settings !== null) {
            writer.writeVector(this.settings, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeTheme {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CreateTheme {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _slug = reader.tgReadString();
        args.slug = _slug;
        const _title = reader.tgReadString();
        args.title = _title;
        if (args.flags & (1 << 2)) {
            const _document = reader.tgReadObject();
            args.document = _document;
        } else {
            args.document = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _settings = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.settings = _settings;
        } else {
            args.settings = undefined;
        }
        return new CreateTheme(args);
    }
}