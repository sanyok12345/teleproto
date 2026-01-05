import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeTopPeerCategory } from "../../types/TypeTopPeerCategory";
import { EntityLike } from "../../types/../../define";

export class ResetTopPeerRating extends MTProtoRequest {
    static CONSTRUCTOR_ID = 451113900;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "contacts.ResetTopPeerRating";
    static classType = "request";

    category!: TypeTopPeerCategory;
    peer?: EntityLike;

    constructor(args: { category?: TypeTopPeerCategory, peer?: EntityLike } = {}) {
        super();
        this.category = args.category!;
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(451113900, false);
        writer.write(this.category.getBytes());
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ResetTopPeerRating {
        const args: any = {};
        const _category = reader.tgReadObject();
        args.category = _category;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new ResetTopPeerRating(args);
    }
}