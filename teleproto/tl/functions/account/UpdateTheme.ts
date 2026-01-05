import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputTheme } from "../../types/TypeInputTheme";
import { TypeInputDocument } from "../../types/TypeInputDocument";
import { TypeInputThemeSettings } from "../../types/TypeInputThemeSettings";
import { TypeTheme } from "../../types/TypeTheme";

export class UpdateTheme extends MTProtoRequest {
    static CONSTRUCTOR_ID = 737414348;
    static SUBCLASS_OF_ID = 1454688268;
    static className = "account.UpdateTheme";
    static classType = "request";

    flags?: number;
    format!: string;
    theme!: TypeInputTheme;
    slug?: string;
    title?: string;
    document?: TypeInputDocument;
    settings?: TypeInputThemeSettings[];

    constructor(args: { flags?: number, format?: string, theme?: TypeInputTheme, slug?: string, title?: string, document?: TypeInputDocument, settings?: TypeInputThemeSettings[] } = {}) {
        super();
        this.flags = args.flags;
        this.format = args.format!;
        this.theme = args.theme!;
        this.slug = args.slug;
        this.title = args.title;
        this.document = args.document;
        this.settings = args.settings;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(737414348, false);
        let flags = 0;
        if (this.slug !== undefined && this.slug !== null) { flags |= 1 << 0; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 1; }
        if (this.document !== undefined && this.document !== null) { flags |= 1 << 2; }
        if (this.settings !== undefined && this.settings !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.format);
        writer.write(this.theme.getBytes());
        if (this.slug !== undefined && this.slug !== null) {
            writer.tgWriteString(this.slug);
        }
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
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

    static fromReader(reader: BinaryReader): UpdateTheme {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _format = reader.tgReadString();
        args.format = _format;
        const _theme = reader.tgReadObject();
        args.theme = _theme;
        if (args.flags & (1 << 0)) {
            const _slug = reader.tgReadString();
            args.slug = _slug;
        } else {
            args.slug = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
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
        return new UpdateTheme(args);
    }
}