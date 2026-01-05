import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputCollectible } from "../../types/TypeInputCollectible";
import { TypeCollectibleInfo } from "../../types/fragment/TypeCollectibleInfo";

export class GetCollectibleInfo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3189671354;
    static SUBCLASS_OF_ID = 3572127632;
    static className = "fragment.GetCollectibleInfo";
    static classType = "request";

    collectible!: TypeInputCollectible;

    constructor(args: { collectible?: TypeInputCollectible } = {}) {
        super();
        this.collectible = args.collectible!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3189671354, false);
        writer.write(this.collectible.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeCollectibleInfo {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetCollectibleInfo {
        const args: any = {};
        const _collectible = reader.tgReadObject();
        args.collectible = _collectible;
        return new GetCollectibleInfo(args);
    }
}