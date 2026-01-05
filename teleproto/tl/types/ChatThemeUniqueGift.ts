import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarGift } from "./TypeStarGift";
import { TypeThemeSettings } from "./TypeThemeSettings";

export class ChatThemeUniqueGift extends TLObject {
    static CONSTRUCTOR_ID = 878246344;
    static SUBCLASS_OF_ID = 805087221;
    static className = "ChatThemeUniqueGift";
    static classType = "constructor";

    gift!: TypeStarGift;
    themeSettings!: TypeThemeSettings[];

    constructor(args: { gift?: TypeStarGift, themeSettings?: TypeThemeSettings[] } = {}) {
        super();
        this.gift = args.gift!;
        this.themeSettings = args.themeSettings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(878246344, false);
        writer.write(this.gift.getBytes());
        writer.writeVector(this.themeSettings, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatThemeUniqueGift {
        const args: any = {};
        const _gift = reader.tgReadObject();
        args.gift = _gift;
        const _themeSettings = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.themeSettings = _themeSettings;
        return new ChatThemeUniqueGift(args);
    }
}