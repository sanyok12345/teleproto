import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class TogglePeerTranslations extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3833378169;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.TogglePeerTranslations";
    static classType = "request";

    flags?: number;
    disabled?: boolean;
    peer?: EntityLike;

    constructor(args: { flags?: number, disabled?: boolean, peer?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.disabled = args.disabled;
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3833378169, false);
        let flags = 0;
        if (this.disabled) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.disabled !== undefined && this.disabled !== null) {
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

    static fromReader(reader: BinaryReader): TogglePeerTranslations {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _disabled = true;
            args.disabled = _disabled;
        } else {
            args.disabled = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new TogglePeerTranslations(args);
    }
}