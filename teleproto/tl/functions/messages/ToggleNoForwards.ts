import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ToggleNoForwards extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2971578274;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.ToggleNoForwards";
    static classType = "request";

    peer?: EntityLike;
    enabled!: boolean;

    constructor(args: { peer?: EntityLike, enabled?: boolean } = {}) {
        super();
        this.peer = args.peer;
        this.enabled = args.enabled!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2971578274, false);
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteBool(this.enabled);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleNoForwards {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _enabled = reader.tgReadBool();
        args.enabled = _enabled;
        return new ToggleNoForwards(args);
    }
}