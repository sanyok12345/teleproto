import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ToggleDialogFilterTags extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4247640649;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ToggleDialogFilterTags";
    static classType = "request";

    enabled!: boolean;

    constructor(args: { enabled?: boolean } = {}) {
        super();
        this.enabled = args.enabled!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4247640649, false);
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

    static fromReader(reader: BinaryReader): ToggleDialogFilterTags {
        const args: any = {};
        const _enabled = reader.tgReadBool();
        args.enabled = _enabled;
        return new ToggleDialogFilterTags(args);
    }
}