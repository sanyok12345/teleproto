import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SetBoostsToUnblockRestrictions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2906234094;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.SetBoostsToUnblockRestrictions";
    static classType = "request";

    channel?: EntityLike;
    boosts!: number;

    constructor(args: { channel?: EntityLike, boosts?: number } = {}) {
        super();
        this.channel = args.channel;
        this.boosts = args.boosts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2906234094, false);
        writer.write((this.channel! as any).getBytes());
        writer.writeInt(this.boosts);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetBoostsToUnblockRestrictions {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _boosts = reader.readInt();
        args.boosts = _boosts;
        return new SetBoostsToUnblockRestrictions(args);
    }
}