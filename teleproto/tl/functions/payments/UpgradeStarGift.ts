import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputSavedStarGift } from "../../types/TypeInputSavedStarGift";
import { TypeUpdates } from "../../types/TypeUpdates";

export class UpgradeStarGift extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2933318901;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "payments.UpgradeStarGift";
    static classType = "request";

    flags?: number;
    keepOriginalDetails?: boolean;
    stargift!: TypeInputSavedStarGift;

    constructor(args: { flags?: number, keepOriginalDetails?: boolean, stargift?: TypeInputSavedStarGift } = {}) {
        super();
        this.flags = args.flags;
        this.keepOriginalDetails = args.keepOriginalDetails;
        this.stargift = args.stargift!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2933318901, false);
        let flags = 0;
        if (this.keepOriginalDetails) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.keepOriginalDetails !== undefined && this.keepOriginalDetails !== null) {
        }
        writer.write(this.stargift.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpgradeStarGift {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _keepOriginalDetails = true;
            args.keepOriginalDetails = _keepOriginalDetails;
        } else {
            args.keepOriginalDetails = false;
        }
        const _stargift = reader.tgReadObject();
        args.stargift = _stargift;
        return new UpgradeStarGift(args);
    }
}