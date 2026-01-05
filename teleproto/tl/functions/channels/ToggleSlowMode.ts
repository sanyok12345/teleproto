import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ToggleSlowMode extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3990134512;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.ToggleSlowMode";
    static classType = "request";

    channel?: EntityLike;
    seconds!: number;

    constructor(args: { channel?: EntityLike, seconds?: number } = {}) {
        super();
        this.channel = args.channel;
        this.seconds = args.seconds!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3990134512, false);
        writer.write((this.channel! as any).getBytes());
        writer.writeInt(this.seconds);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleSlowMode {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _seconds = reader.readInt();
        args.seconds = _seconds;
        return new ToggleSlowMode(args);
    }
}