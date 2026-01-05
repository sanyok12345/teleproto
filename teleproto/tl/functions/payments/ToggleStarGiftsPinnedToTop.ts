import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputSavedStarGift } from "../../types/TypeInputSavedStarGift";

export class ToggleStarGiftsPinnedToTop extends MTProtoRequest {
    static CONSTRUCTOR_ID = 353626032;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "payments.ToggleStarGiftsPinnedToTop";
    static classType = "request";

    peer?: EntityLike;
    stargift!: TypeInputSavedStarGift[];

    constructor(args: { peer?: EntityLike, stargift?: TypeInputSavedStarGift[] } = {}) {
        super();
        this.peer = args.peer;
        this.stargift = args.stargift!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(353626032, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeVector(this.stargift, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ToggleStarGiftsPinnedToTop {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _stargift = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.stargift = _stargift;
        return new ToggleStarGiftsPinnedToTop(args);
    }
}