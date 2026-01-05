import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputSavedStarGift } from "../../types/TypeInputSavedStarGift";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class TransferStarGift extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2132285290;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "payments.TransferStarGift";
    static classType = "request";

    stargift!: TypeInputSavedStarGift;
    toId!: EntityLike;

    constructor(args: { stargift?: TypeInputSavedStarGift, toId?: EntityLike } = {}) {
        super();
        this.stargift = args.stargift!;
        this.toId = args.toId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2132285290, false);
        writer.write(this.stargift.getBytes());
        writer.write((this.toId as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): TransferStarGift {
        const args: any = {};
        const _stargift = reader.tgReadObject();
        args.stargift = _stargift;
        const _toId = reader.tgReadObject();
        args.toId = _toId;
        return new TransferStarGift(args);
    }
}