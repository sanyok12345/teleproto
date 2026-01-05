import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class DeleteStarGiftCollection extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2908113128;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "payments.DeleteStarGiftCollection";
    static classType = "request";

    peer?: EntityLike;
    collectionId!: number;

    constructor(args: { peer?: EntityLike, collectionId?: number } = {}) {
        super();
        this.peer = args.peer;
        this.collectionId = args.collectionId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2908113128, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.collectionId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteStarGiftCollection {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _collectionId = reader.readInt();
        args.collectionId = _collectionId;
        return new DeleteStarGiftCollection(args);
    }
}