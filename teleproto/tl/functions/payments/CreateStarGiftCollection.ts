import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputSavedStarGift } from "../../types/TypeInputSavedStarGift";
import { TypeStarGiftCollection } from "../../types/TypeStarGiftCollection";

export class CreateStarGiftCollection extends MTProtoRequest {
    static CONSTRUCTOR_ID = 524947079;
    static SUBCLASS_OF_ID = 1138805578;
    static className = "payments.CreateStarGiftCollection";
    static classType = "request";

    peer?: EntityLike;
    title!: string;
    stargift!: TypeInputSavedStarGift[];

    constructor(args: { peer?: EntityLike, title?: string, stargift?: TypeInputSavedStarGift[] } = {}) {
        super();
        this.peer = args.peer;
        this.title = args.title!;
        this.stargift = args.stargift!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(524947079, false);
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.title);
        writer.writeVector(this.stargift, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarGiftCollection {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CreateStarGiftCollection {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _title = reader.tgReadString();
        args.title = _title;
        const _stargift = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.stargift = _stargift;
        return new CreateStarGiftCollection(args);
    }
}