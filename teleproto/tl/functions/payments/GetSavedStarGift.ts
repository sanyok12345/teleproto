import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputSavedStarGift } from "../../types/TypeInputSavedStarGift";
import { TypeSavedStarGifts } from "../../types/payments/TypeSavedStarGifts";

export class GetSavedStarGift extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3025510662;
    static SUBCLASS_OF_ID = 3574671511;
    static className = "payments.GetSavedStarGift";
    static classType = "request";

    stargift!: TypeInputSavedStarGift[];

    constructor(args: { stargift?: TypeInputSavedStarGift[] } = {}) {
        super();
        this.stargift = args.stargift!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3025510662, false);
        writer.writeVector(this.stargift, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSavedStarGifts {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSavedStarGift {
        const args: any = {};
        const _stargift = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.stargift = _stargift;
        return new GetSavedStarGift(args);
    }
}