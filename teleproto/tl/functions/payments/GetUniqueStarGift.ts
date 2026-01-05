import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUniqueStarGift } from "../../types/payments/TypeUniqueStarGift";

export class GetUniqueStarGift extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2711047538;
    static SUBCLASS_OF_ID = 2024850939;
    static className = "payments.GetUniqueStarGift";
    static classType = "request";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2711047538, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUniqueStarGift {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetUniqueStarGift {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new GetUniqueStarGift(args);
    }
}