import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputSavedStarGift } from "../../types/TypeInputSavedStarGift";

export class SaveStarGift extends MTProtoRequest {
    static CONSTRUCTOR_ID = 707422588;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "payments.SaveStarGift";
    static classType = "request";

    flags?: number;
    unsave?: boolean;
    stargift!: TypeInputSavedStarGift;

    constructor(args: { flags?: number, unsave?: boolean, stargift?: TypeInputSavedStarGift } = {}) {
        super();
        this.flags = args.flags;
        this.unsave = args.unsave;
        this.stargift = args.stargift!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(707422588, false);
        let flags = 0;
        if (this.unsave) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.unsave !== undefined && this.unsave !== null) {
        }
        writer.write(this.stargift.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveStarGift {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _unsave = true;
            args.unsave = _unsave;
        } else {
            args.unsave = false;
        }
        const _stargift = reader.tgReadObject();
        args.stargift = _stargift;
        return new SaveStarGift(args);
    }
}