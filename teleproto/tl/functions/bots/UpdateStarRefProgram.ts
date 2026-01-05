import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStarRefProgram } from "../../types/TypeStarRefProgram";

export class UpdateStarRefProgram extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2005621427;
    static SUBCLASS_OF_ID = 2559107074;
    static className = "bots.UpdateStarRefProgram";
    static classType = "request";

    flags?: number;
    bot?: EntityLike;
    commissionPermille!: number;
    durationMonths?: number;

    constructor(args: { flags?: number, bot?: EntityLike, commissionPermille?: number, durationMonths?: number } = {}) {
        super();
        this.flags = args.flags;
        this.bot = args.bot;
        this.commissionPermille = args.commissionPermille!;
        this.durationMonths = args.durationMonths;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2005621427, false);
        let flags = 0;
        if (this.durationMonths !== undefined && this.durationMonths !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write((this.bot! as any).getBytes());
        writer.writeInt(this.commissionPermille);
        if (this.durationMonths !== undefined && this.durationMonths !== null) {
            writer.writeInt(this.durationMonths);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarRefProgram {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateStarRefProgram {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _commissionPermille = reader.readInt();
        args.commissionPermille = _commissionPermille;
        if (args.flags & (1 << 0)) {
            const _durationMonths = reader.readInt();
            args.durationMonths = _durationMonths;
        } else {
            args.durationMonths = undefined;
        }
        return new UpdateStarRefProgram(args);
    }
}