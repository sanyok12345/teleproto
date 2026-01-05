import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputCheckPasswordSRP } from "../../types/TypeInputCheckPasswordSRP";
import { TypeStarsRevenueWithdrawalUrl } from "../../types/payments/TypeStarsRevenueWithdrawalUrl";

export class GetStarsRevenueWithdrawalUrl extends MTProtoRequest {
    static CONSTRUCTOR_ID = 607378578;
    static SUBCLASS_OF_ID = 2221318382;
    static className = "payments.GetStarsRevenueWithdrawalUrl";
    static classType = "request";

    flags?: number;
    ton?: boolean;
    peer?: EntityLike;
    amount?: bigint;
    password!: TypeInputCheckPasswordSRP;

    constructor(args: { flags?: number, ton?: boolean, peer?: EntityLike, amount?: bigint, password?: TypeInputCheckPasswordSRP } = {}) {
        super();
        this.flags = args.flags;
        this.ton = args.ton;
        this.peer = args.peer;
        this.amount = args.amount;
        this.password = args.password!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(607378578, false);
        let flags = 0;
        if (this.ton) { flags |= 1 << 0; }
        if (this.amount !== undefined && this.amount !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.ton !== undefined && this.ton !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (this.amount !== undefined && this.amount !== null) {
            writer.writeLargeInt(this.amount, 64);
        }
        writer.write(this.password.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarsRevenueWithdrawalUrl {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarsRevenueWithdrawalUrl {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _ton = true;
            args.ton = _ton;
        } else {
            args.ton = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 1)) {
            const _amount = reader.readLargeInt(64);
            args.amount = _amount;
        } else {
            args.amount = undefined;
        }
        const _password = reader.tgReadObject();
        args.password = _password;
        return new GetStarsRevenueWithdrawalUrl(args);
    }
}