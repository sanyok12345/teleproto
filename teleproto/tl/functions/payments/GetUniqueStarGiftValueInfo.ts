import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUniqueStarGiftValueInfo } from "../../types/payments/TypeUniqueStarGiftValueInfo";

export class GetUniqueStarGiftValueInfo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1130737515;
    static SUBCLASS_OF_ID = 372595652;
    static className = "payments.GetUniqueStarGiftValueInfo";
    static classType = "request";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1130737515, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUniqueStarGiftValueInfo {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetUniqueStarGiftValueInfo {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new GetUniqueStarGiftValueInfo(args);
    }
}