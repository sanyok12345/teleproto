import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTheme } from "./TypeTheme";

export class UpdateTheme extends TLObject {
    static CONSTRUCTOR_ID = 2182544291;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateTheme";
    static classType = "constructor";

    theme!: TypeTheme;

    constructor(args: { theme?: TypeTheme } = {}) {
        super();
        this.theme = args.theme!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2182544291, false);
        writer.write(this.theme.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateTheme {
        const args: any = {};
        const _theme = reader.tgReadObject();
        args.theme = _theme;
        return new UpdateTheme(args);
    }
}