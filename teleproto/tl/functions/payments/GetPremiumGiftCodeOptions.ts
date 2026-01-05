import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypePremiumGiftCodeOption } from "../../types/TypePremiumGiftCodeOption";

export class GetPremiumGiftCodeOptions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 660060756;
    static SUBCLASS_OF_ID = 178857347;
    static className = "payments.GetPremiumGiftCodeOptions";
    static classType = "request";

    flags?: number;
    boostPeer?: EntityLike;

    constructor(args: { flags?: number, boostPeer?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.boostPeer = args.boostPeer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(660060756, false);
        let flags = 0;
        if (this.boostPeer !== undefined && this.boostPeer !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.boostPeer !== undefined && this.boostPeer !== null) {
            writer.write((this.boostPeer as any).getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePremiumGiftCodeOption[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPremiumGiftCodeOptions {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _boostPeer = reader.tgReadObject();
            args.boostPeer = _boostPeer;
        } else {
            args.boostPeer = undefined;
        }
        return new GetPremiumGiftCodeOptions(args);
    }
}