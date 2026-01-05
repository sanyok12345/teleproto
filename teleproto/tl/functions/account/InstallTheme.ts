import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputTheme } from "../../types/TypeInputTheme";
import { TypeBaseTheme } from "../../types/TypeBaseTheme";

export class InstallTheme extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3341269819;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.InstallTheme";
    static classType = "request";

    flags?: number;
    dark?: boolean;
    theme?: TypeInputTheme;
    format?: string;
    baseTheme?: TypeBaseTheme;

    constructor(args: { flags?: number, dark?: boolean, theme?: TypeInputTheme, format?: string, baseTheme?: TypeBaseTheme } = {}) {
        super();
        this.flags = args.flags;
        this.dark = args.dark;
        this.theme = args.theme;
        this.format = args.format;
        this.baseTheme = args.baseTheme;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3341269819, false);
        let flags = 0;
        if (this.dark) { flags |= 1 << 0; }
        if (this.theme !== undefined && this.theme !== null) { flags |= 1 << 1; }
        if (this.format !== undefined && this.format !== null) { flags |= 1 << 2; }
        if (this.baseTheme !== undefined && this.baseTheme !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.dark !== undefined && this.dark !== null) {
        }
        if (this.theme !== undefined && this.theme !== null) {
            writer.write(this.theme.getBytes());
        }
        if (this.format !== undefined && this.format !== null) {
            writer.tgWriteString(this.format);
        }
        if (this.baseTheme !== undefined && this.baseTheme !== null) {
            writer.write(this.baseTheme.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InstallTheme {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _dark = true;
            args.dark = _dark;
        } else {
            args.dark = false;
        }
        if (args.flags & (1 << 1)) {
            const _theme = reader.tgReadObject();
            args.theme = _theme;
        } else {
            args.theme = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _format = reader.tgReadString();
            args.format = _format;
        } else {
            args.format = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _baseTheme = reader.tgReadObject();
            args.baseTheme = _baseTheme;
        } else {
            args.baseTheme = undefined;
        }
        return new InstallTheme(args);
    }
}