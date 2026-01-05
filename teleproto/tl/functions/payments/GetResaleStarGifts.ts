import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeStarGiftAttributeId } from "../../types/TypeStarGiftAttributeId";
import { TypeResaleStarGifts } from "../../types/payments/TypeResaleStarGifts";

export class GetResaleStarGifts extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2053087798;
    static SUBCLASS_OF_ID = 3000743907;
    static className = "payments.GetResaleStarGifts";
    static classType = "request";

    flags?: number;
    sortByPrice?: boolean;
    sortByNum?: boolean;
    attributesHash?: bigint;
    giftId!: bigint;
    attributes?: TypeStarGiftAttributeId[];
    offset!: string;
    limit!: number;

    constructor(args: { flags?: number, sortByPrice?: boolean, sortByNum?: boolean, attributesHash?: bigint, giftId?: bigint, attributes?: TypeStarGiftAttributeId[], offset?: string, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.sortByPrice = args.sortByPrice;
        this.sortByNum = args.sortByNum;
        this.attributesHash = args.attributesHash;
        this.giftId = args.giftId!;
        this.attributes = args.attributes;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2053087798, false);
        let flags = 0;
        if (this.sortByPrice) { flags |= 1 << 1; }
        if (this.sortByNum) { flags |= 1 << 2; }
        if (this.attributesHash !== undefined && this.attributesHash !== null) { flags |= 1 << 0; }
        if (this.attributes !== undefined && this.attributes !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.sortByPrice !== undefined && this.sortByPrice !== null) {
        }
        if (this.sortByNum !== undefined && this.sortByNum !== null) {
        }
        if (this.attributesHash !== undefined && this.attributesHash !== null) {
            writer.writeLargeInt(this.attributesHash, 64);
        }
        writer.writeLargeInt(this.giftId, 64);
        if (this.attributes !== undefined && this.attributes !== null) {
            writer.writeVector(this.attributes, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.tgWriteString(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeResaleStarGifts {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetResaleStarGifts {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _sortByPrice = true;
            args.sortByPrice = _sortByPrice;
        } else {
            args.sortByPrice = false;
        }
        if (args.flags & (1 << 2)) {
            const _sortByNum = true;
            args.sortByNum = _sortByNum;
        } else {
            args.sortByNum = false;
        }
        if (args.flags & (1 << 0)) {
            const _attributesHash = reader.readLargeInt(64);
            args.attributesHash = _attributesHash;
        } else {
            args.attributesHash = undefined;
        }
        const _giftId = reader.readLargeInt(64);
        args.giftId = _giftId;
        if (args.flags & (1 << 3)) {
            const _attributes = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.attributes = _attributes;
        } else {
            args.attributes = undefined;
        }
        const _offset = reader.tgReadString();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetResaleStarGifts(args);
    }
}