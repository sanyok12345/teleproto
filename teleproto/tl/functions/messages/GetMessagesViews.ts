import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMessageViews } from "../../types/messages/TypeMessageViews";

export class GetMessagesViews extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1468322785;
    static SUBCLASS_OF_ID = 2947935132;
    static className = "messages.GetMessagesViews";
    static classType = "request";

    peer?: EntityLike;
    id?: number[];
    increment!: boolean;

    constructor(args: { peer?: EntityLike, id?: number[], increment?: boolean } = {}) {
        super();
        this.peer = args.peer;
        this.id = args.id;
        this.increment = args.increment!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1468322785, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeVector(this.id!, (item) => {
            writer.writeInt(item);
        });
        writer.tgWriteBool(this.increment);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessageViews {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetMessagesViews {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        const _increment = reader.tgReadBool();
        args.increment = _increment;
        return new GetMessagesViews(args);
    }
}