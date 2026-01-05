import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputSavedStarGift } from "../../types/TypeInputSavedStarGift";
import { TypeStarsAmount } from "../../types/TypeStarsAmount";
import { TypeUpdates } from "../../types/TypeUpdates";

export class UpdateStarGiftPrice extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3988679883;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "payments.UpdateStarGiftPrice";
    static classType = "request";

    stargift!: TypeInputSavedStarGift;
    resellAmount!: TypeStarsAmount;

    constructor(args: { stargift?: TypeInputSavedStarGift, resellAmount?: TypeStarsAmount } = {}) {
        super();
        this.stargift = args.stargift!;
        this.resellAmount = args.resellAmount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3988679883, false);
        writer.write(this.stargift.getBytes());
        writer.write(this.resellAmount.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateStarGiftPrice {
        const args: any = {};
        const _stargift = reader.tgReadObject();
        args.stargift = _stargift;
        const _resellAmount = reader.tgReadObject();
        args.resellAmount = _resellAmount;
        return new UpdateStarGiftPrice(args);
    }
}