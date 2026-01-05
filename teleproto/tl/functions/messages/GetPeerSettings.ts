import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypePeerSettings } from "../../types/messages/TypePeerSettings";

export class GetPeerSettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4024018594;
    static SUBCLASS_OF_ID = 1705179041;
    static className = "messages.GetPeerSettings";
    static classType = "request";

    peer?: EntityLike;

    constructor(args: { peer?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4024018594, false);
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePeerSettings {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPeerSettings {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new GetPeerSettings(args);
    }
}