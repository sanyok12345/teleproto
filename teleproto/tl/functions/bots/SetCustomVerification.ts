import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class SetCustomVerification extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2341068733;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.SetCustomVerification";
    static classType = "request";

    flags?: number;
    enabled?: boolean;
    bot?: EntityLike;
    peer?: EntityLike;
    customDescription?: string;

    constructor(args: { flags?: number, enabled?: boolean, bot?: EntityLike, peer?: EntityLike, customDescription?: string } = {}) {
        super();
        this.flags = args.flags;
        this.enabled = args.enabled;
        this.bot = args.bot;
        this.peer = args.peer;
        this.customDescription = args.customDescription;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2341068733, false);
        let flags = 0;
        if (this.enabled) { flags |= 1 << 1; }
        if (this.bot !== undefined && this.bot !== null) { flags |= 1 << 0; }
        if (this.customDescription !== undefined && this.customDescription !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.enabled !== undefined && this.enabled !== null) {
        }
        if (this.bot !== undefined && this.bot !== null) {
            writer.write((this.bot as any).getBytes());
        }
        writer.write((this.peer! as any).getBytes());
        if (this.customDescription !== undefined && this.customDescription !== null) {
            writer.tgWriteString(this.customDescription);
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

    static fromReader(reader: BinaryReader): SetCustomVerification {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _enabled = true;
            args.enabled = _enabled;
        } else {
            args.enabled = false;
        }
        if (args.flags & (1 << 0)) {
            const _bot = reader.tgReadObject();
            args.bot = _bot;
        } else {
            args.bot = undefined;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 2)) {
            const _customDescription = reader.tgReadString();
            args.customDescription = _customDescription;
        } else {
            args.customDescription = undefined;
        }
        return new SetCustomVerification(args);
    }
}