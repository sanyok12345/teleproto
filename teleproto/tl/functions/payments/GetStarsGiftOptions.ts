import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStarsGiftOption } from "../../types/TypeStarsGiftOption";

export class GetStarsGiftOptions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3553192904;
    static SUBCLASS_OF_ID = 3919820757;
    static className = "payments.GetStarsGiftOptions";
    static classType = "request";

    flags?: number;
    userId?: EntityLike;

    constructor(args: { flags?: number, userId?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.userId = args.userId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3553192904, false);
        let flags = 0;
        if (this.userId !== undefined && this.userId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.userId !== undefined && this.userId !== null) {
            writer.write((this.userId as any).getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarsGiftOption[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarsGiftOptions {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _userId = reader.tgReadObject();
            args.userId = _userId;
        } else {
            args.userId = undefined;
        }
        return new GetStarsGiftOptions(args);
    }
}