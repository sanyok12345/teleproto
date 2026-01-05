import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeBotMenuButton } from "./TypeBotMenuButton";

export class UpdateBotMenuButton extends TLObject {
    static CONSTRUCTOR_ID = 347625491;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotMenuButton";
    static classType = "constructor";

    botId!: bigint;
    button!: TypeBotMenuButton;

    constructor(args: { botId?: bigint, button?: TypeBotMenuButton } = {}) {
        super();
        this.botId = args.botId!;
        this.button = args.button!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(347625491, false);
        writer.writeLargeInt(this.botId, 64);
        writer.write(this.button.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotMenuButton {
        const args: any = {};
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _button = reader.tgReadObject();
        args.button = _button;
        return new UpdateBotMenuButton(args);
    }
}