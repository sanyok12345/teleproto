import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ToggleBotInAttachMenu extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1777704297;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ToggleBotInAttachMenu";
    static classType = "request";

    flags?: number;
    writeAllowed?: boolean;
    bot?: EntityLike;
    enabled!: boolean;

    constructor(args: { flags?: number, writeAllowed?: boolean, bot?: EntityLike, enabled?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.writeAllowed = args.writeAllowed;
        this.bot = args.bot;
        this.enabled = args.enabled!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1777704297, false);
        let flags = 0;
        if (this.writeAllowed) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.writeAllowed !== undefined && this.writeAllowed !== null) {
        }
        writer.write((this.bot! as any).getBytes());
        writer.tgWriteBool(this.enabled);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleBotInAttachMenu {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _writeAllowed = true;
            args.writeAllowed = _writeAllowed;
        } else {
            args.writeAllowed = false;
        }
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _enabled = reader.tgReadBool();
        args.enabled = _enabled;
        return new ToggleBotInAttachMenu(args);
    }
}