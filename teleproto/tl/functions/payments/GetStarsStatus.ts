import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStarsStatus } from "../../types/payments/TypeStarsStatus";

export class GetStarsStatus extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1319744447;
    static SUBCLASS_OF_ID = 1855724911;
    static className = "payments.GetStarsStatus";
    static classType = "request";

    flags?: number;
    ton?: boolean;
    peer?: EntityLike;

    constructor(args: { flags?: number, ton?: boolean, peer?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.ton = args.ton;
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1319744447, false);
        let flags = 0;
        if (this.ton) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.ton !== undefined && this.ton !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarsStatus {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarsStatus {
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
        return new GetStarsStatus(args);
    }
}