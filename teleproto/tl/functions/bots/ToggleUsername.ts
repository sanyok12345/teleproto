import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ToggleUsername extends MTProtoRequest {
    static CONSTRUCTOR_ID = 87861619;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.ToggleUsername";
    static classType = "request";

    bot?: EntityLike;
    username!: string;
    active!: boolean;

    constructor(args: { bot?: EntityLike, username?: string, active?: boolean } = {}) {
        super();
        this.bot = args.bot;
        this.username = args.username!;
        this.active = args.active!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(87861619, false);
        writer.write((this.bot! as any).getBytes());
        writer.tgWriteString(this.username);
        writer.tgWriteBool(this.active);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleUsername {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _username = reader.tgReadString();
        args.username = _username;
        const _active = reader.tgReadBool();
        args.active = _active;
        return new ToggleUsername(args);
    }
}