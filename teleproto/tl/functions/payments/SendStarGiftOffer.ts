import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStarsAmount } from "../../types/TypeStarsAmount";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendStarGiftOffer extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2411227969;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "payments.SendStarGiftOffer";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    slug!: string;
    price!: TypeStarsAmount;
    duration!: number;
    randomId!: bigint;
    allowPaidStars?: bigint;

    constructor(args: { flags?: number, peer?: EntityLike, slug?: string, price?: TypeStarsAmount, duration?: number, randomId?: bigint, allowPaidStars?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.slug = args.slug!;
        this.price = args.price!;
        this.duration = args.duration!;
        this.randomId = args.randomId!;
        this.allowPaidStars = args.allowPaidStars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2411227969, false);
        let flags = 0;
        if (this.allowPaidStars !== undefined && this.allowPaidStars !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.slug);
        writer.write(this.price.getBytes());
        writer.writeInt(this.duration);
        writer.writeLargeInt(this.randomId, 64);
        if (this.allowPaidStars !== undefined && this.allowPaidStars !== null) {
            writer.writeLargeInt(this.allowPaidStars, 64);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendStarGiftOffer {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _slug = reader.tgReadString();
        args.slug = _slug;
        const _price = reader.tgReadObject();
        args.price = _price;
        const _duration = reader.readInt();
        args.duration = _duration;
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        if (args.flags & (1 << 0)) {
            const _allowPaidStars = reader.readLargeInt(64);
            args.allowPaidStars = _allowPaidStars;
        } else {
            args.allowPaidStars = undefined;
        }
        return new SendStarGiftOffer(args);
    }
}