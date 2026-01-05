import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocument } from "./TypeDocument";
import { TypeThemeSettings } from "./TypeThemeSettings";

export class WebPageAttributeTheme extends TLObject {
    static CONSTRUCTOR_ID = 1421174295;
    static SUBCLASS_OF_ID = 2949638599;
    static className = "WebPageAttributeTheme";
    static classType = "constructor";

    flags!: number;
    documents?: TypeDocument[];
    settings?: TypeThemeSettings;

    constructor(args: { flags?: number, documents?: TypeDocument[], settings?: TypeThemeSettings } = {}) {
        super();
        this.flags = args.flags!;
        this.documents = args.documents;
        this.settings = args.settings;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1421174295, false);
        let flags = 0;
        if (this.documents !== undefined && this.documents !== null) { flags |= 1 << 0; }
        if (this.settings !== undefined && this.settings !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.documents !== undefined && this.documents !== null) {
            writer.writeVector(this.documents, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.settings !== undefined && this.settings !== null) {
            writer.write(this.settings.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebPageAttributeTheme {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _documents = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.documents = _documents;
        } else {
            args.documents = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _settings = reader.tgReadObject();
            args.settings = _settings;
        } else {
            args.settings = undefined;
        }
        return new WebPageAttributeTheme(args);
    }
}