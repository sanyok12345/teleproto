import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputStarGiftAuction } from "../../types/TypeInputStarGiftAuction";
import { TypeStarGiftAuctionState } from "../../types/payments/TypeStarGiftAuctionState";

export class GetStarGiftAuctionState extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1553986774;
    static SUBCLASS_OF_ID = 439453081;
    static className = "payments.GetStarGiftAuctionState";
    static classType = "request";

    auction!: TypeInputStarGiftAuction;
    version!: number;

    constructor(args: { auction?: TypeInputStarGiftAuction, version?: number } = {}) {
        super();
        this.auction = args.auction!;
        this.version = args.version!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1553986774, false);
        writer.write(this.auction.getBytes());
        writer.writeInt(this.version);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarGiftAuctionState {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarGiftAuctionState {
        const args: any = {};
        const _auction = reader.tgReadObject();
        args.auction = _auction;
        const _version = reader.readInt();
        args.version = _version;
        return new GetStarGiftAuctionState(args);
    }
}