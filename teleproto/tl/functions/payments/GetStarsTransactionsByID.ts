import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputStarsTransaction } from "../../types/TypeInputStarsTransaction";
import { TypeStarsStatus } from "../../types/payments/TypeStarsStatus";

export class GetStarsTransactionsByID extends MTProtoRequest {
    static CONSTRUCTOR_ID = 768218808;
    static SUBCLASS_OF_ID = 1855724911;
    static className = "payments.GetStarsTransactionsByID";
    static classType = "request";

    flags?: number;
    ton?: boolean;
    peer?: EntityLike;
    id?: TypeInputStarsTransaction[];

    constructor(args: { flags?: number, ton?: boolean, peer?: EntityLike, id?: TypeInputStarsTransaction[] } = {}) {
        super();
        this.flags = args.flags;
        this.ton = args.ton;
        this.peer = args.peer;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(768218808, false);
        let flags = 0;
        if (this.ton) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.ton !== undefined && this.ton !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.writeVector(this.id!, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarsStatus {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarsTransactionsByID {
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
        const _id = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.id = _id;
        return new GetStarsTransactionsByID(args);
    }
}