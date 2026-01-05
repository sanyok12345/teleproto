import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeBotMenuButton } from "../../types/TypeBotMenuButton";

export class SetBotMenuButton extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1157944655;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.SetBotMenuButton";
    static classType = "request";

    userId!: EntityLike;
    button!: TypeBotMenuButton;

    constructor(args: { userId?: EntityLike, button?: TypeBotMenuButton } = {}) {
        super();
        this.userId = args.userId!;
        this.button = args.button!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1157944655, false);
        writer.write((this.userId as any).getBytes());
        writer.write(this.button.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetBotMenuButton {
        const args: any = {};
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _button = reader.tgReadObject();
        args.button = _button;
        return new SetBotMenuButton(args);
    }
}