import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputChatTheme } from "../../types/TypeInputChatTheme";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SetChatTheme extends MTProtoRequest {
    static CONSTRUCTOR_ID = 135398089;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SetChatTheme";
    static classType = "request";

    peer?: EntityLike;
    theme!: TypeInputChatTheme;

    constructor(args: { peer?: EntityLike, theme?: TypeInputChatTheme } = {}) {
        super();
        this.peer = args.peer;
        this.theme = args.theme!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(135398089, false);
        writer.write((this.peer! as any).getBytes());
        writer.write(this.theme.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetChatTheme {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _theme = reader.tgReadObject();
        args.theme = _theme;
        return new SetChatTheme(args);
    }
}