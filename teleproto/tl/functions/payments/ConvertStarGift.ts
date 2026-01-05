import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputSavedStarGift } from "../../types/TypeInputSavedStarGift";

export class ConvertStarGift extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1958676331;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "payments.ConvertStarGift";
    static classType = "request";

    stargift!: TypeInputSavedStarGift;

    constructor(args: { stargift?: TypeInputSavedStarGift } = {}) {
        super();
        this.stargift = args.stargift!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1958676331, false);
        writer.write(this.stargift.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ConvertStarGift {
        const args: any = {};
        const _stargift = reader.tgReadObject();
        args.stargift = _stargift;
        return new ConvertStarGift(args);
    }
}