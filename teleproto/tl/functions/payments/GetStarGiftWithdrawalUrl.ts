import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputSavedStarGift } from "../../types/TypeInputSavedStarGift";
import { TypeInputCheckPasswordSRP } from "../../types/TypeInputCheckPasswordSRP";
import { TypeStarGiftWithdrawalUrl } from "../../types/payments/TypeStarGiftWithdrawalUrl";

export class GetStarGiftWithdrawalUrl extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3496907688;
    static SUBCLASS_OF_ID = 2726440389;
    static className = "payments.GetStarGiftWithdrawalUrl";
    static classType = "request";

    stargift!: TypeInputSavedStarGift;
    password!: TypeInputCheckPasswordSRP;

    constructor(args: { stargift?: TypeInputSavedStarGift, password?: TypeInputCheckPasswordSRP } = {}) {
        super();
        this.stargift = args.stargift!;
        this.password = args.password!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3496907688, false);
        writer.write(this.stargift.getBytes());
        writer.write(this.password.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarGiftWithdrawalUrl {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarGiftWithdrawalUrl {
        const args: any = {};
        const _stargift = reader.tgReadObject();
        args.stargift = _stargift;
        const _password = reader.tgReadObject();
        args.password = _password;
        return new GetStarGiftWithdrawalUrl(args);
    }
}