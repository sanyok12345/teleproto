import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStarsRevenueStats } from "../../types/payments/TypeStarsRevenueStats";

export class GetStarsRevenueStats extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3642751702;
    static SUBCLASS_OF_ID = 2772915699;
    static className = "payments.GetStarsRevenueStats";
    static classType = "request";

    flags?: number;
    dark?: boolean;
    ton?: boolean;
    peer?: EntityLike;

    constructor(args: { flags?: number, dark?: boolean, ton?: boolean, peer?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.dark = args.dark;
        this.ton = args.ton;
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3642751702, false);
        let flags = 0;
        if (this.dark) { flags |= 1 << 0; }
        if (this.ton) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.dark !== undefined && this.dark !== null) {
        }
        if (this.ton !== undefined && this.ton !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarsRevenueStats {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarsRevenueStats {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _dark = true;
            args.dark = _dark;
        } else {
            args.dark = false;
        }
        if (args.flags & (1 << 1)) {
            const _ton = true;
            args.ton = _ton;
        } else {
            args.ton = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new GetStarsRevenueStats(args);
    }
}