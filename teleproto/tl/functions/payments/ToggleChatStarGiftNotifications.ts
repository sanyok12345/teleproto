import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ToggleChatStarGiftNotifications extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1626009505;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "payments.ToggleChatStarGiftNotifications";
    static classType = "request";

    flags?: number;
    enabled?: boolean;
    peer?: EntityLike;

    constructor(args: { flags?: number, enabled?: boolean, peer?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.enabled = args.enabled;
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1626009505, false);
        let flags = 0;
        if (this.enabled) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.enabled !== undefined && this.enabled !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleChatStarGiftNotifications {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _enabled = true;
            args.enabled = _enabled;
        } else {
            args.enabled = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new ToggleChatStarGiftNotifications(args);
    }
}